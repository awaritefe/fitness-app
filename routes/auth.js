const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation')

    router.post('/register', async (req, res) => {

        // validating the data before its saved using joi
        const { error } = registerValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        // checking to see if email already exists
        const emailExist = await User.findOne({ email: req.body.email });
        if(emailExist) return res.status(400).send('Email already exists');

        // Hash passwords with bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // create a new user
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            phoneNumber: req.body.phoneNumber
        });
        try {
            const savedUser = await user.save();
            res.send({ user: user._id });
        } catch (err) {
            res.status(400).send(err);
        }
    });
    // LOGIN
    router.post('/login', async (req, res) => {

         // validating the data before its saved using joi
        const { error } = loginValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

            // checking to see if email already exists
            const user = await User.findOne({ email: req.body.email });
            if(!user) return res.status(400).send('Email or password incorrect');
            // Password is valid
            const validPass = await bcrypt.compare(req.body.password, user.password);
            if(!validPass) return res.status(400).send('Invalid password')

            // create and assign a token
            const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRECT);
            res.json({ access_token: token });
    });

module.exports = router;