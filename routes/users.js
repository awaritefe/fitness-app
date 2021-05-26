const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const User = require('../models/User');

const router = express.Router();
router.use(verifyToken);

// GETS USER DETAILS
router.get('/', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.json({ message: err });
    }
});

// SUBMITS USER DETAILS
router.post('/', async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber
    });
    try {
        const savedPost = await user.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err });
        });
    } catch (err) {
        res.json({ message: err });
    }
});
// SPECIFIC USER
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    }catch(err){
        res.json({ message: err });
    }
});

// DELETES USER DETAILS 
router.delete('/:userId', async (req, res) => {
    try {
        const removeUser = await User.remove({ _id: req.params.userId });
        res.json(removeUser);
    }catch(err){
        res.json({ message: err });
    }
});

// UPDATE USER DETAILS 
router.patch('/:userId', async (req, res) => {
    try {
        const updateUser = await User.updateOne(
            { _id: req.params.userId },
            { $set: { firstName: req.body.firstName } },
            { $set: { lastName: req.body.lastName } },
            { $set: { email: req.body.email } },
            { $set: { phoneNumber: req.body.phoneNumber } }
        );
        res.json(updateUser);
    }catch(err){
        res.json({ message: err });
    }
});

module.exports = router;