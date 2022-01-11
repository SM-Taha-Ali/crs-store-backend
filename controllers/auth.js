const express = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/Users')

const JWT_SECRET = "clix123#p$rO"

async function createUser(req, res) {
    // Check whether the user with this email already exists
    try {
        const errors = validationResult(req);
        // Checking if validations are fulfilled
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists." })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // Creating user by using create method of mongoose model
        user = await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: secPass,
            email: req.body.email,
            phoneno: req.body.phoneno,
        });
        // Sending the user object as a response
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);
        res.json({ authToken });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }

}

async function loginAuth(req, res) {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid Email or Password" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Invalid Email or Password" })
        }

        // Sending the user object as a response
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}

async function getUser(req, res) {
    try {
        var userID = req.user.id;
        const user = await User.findById(userID).select("-password");
        res.send(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}


module.exports = {
    createUser,
    loginAuth,
    getUser
}