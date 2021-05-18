const router = require('express').Router();
const User = require('../models/User');
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
        const salt = await bcrypt.gentSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // create a new user
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: hashedPassword
        });
        try {
            const savedUser = await user.save();
            res.send(savedUser);
        } catch (err) {
            res.status(400).send(err);
        }
    });

module.exports = router;