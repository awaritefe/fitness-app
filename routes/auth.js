const router = require('express').Router();
const User = require('../models/User');

// AUTHENTICATION
const Joi = require('joi');

const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string()
        .email({ minDomainSegments: 2 }),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    phoneNumber: Joi.number().integer().min(7).required()
});

    router.post('/register', async (req, res) => {

        // validating the data before its used usung joi
        const { error } = schema.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber
        });
        try {
            const savedUser = await user.save();
            res.send(savedUser);
        } catch (err) {
            res.status(400).send(err);
        }
    });

module.exports = router;