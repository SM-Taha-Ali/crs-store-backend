const { validationResult } = require('express-validator');
const Mail = require('../models/Mail');


// SEND EMAIL

async function sendEmail(req, res) {
    try {
        const mail = new Mail({
            user: req.user.id,
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
        })
        const savedMail = await mail.save();
        res.json(savedMail);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}



// RETRIEVE PRODUCTS

async function getMail(req, res) {
    try {
        const mail = await Mail.find()
        res.json(mail);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}


// DELETE PRODUCT

async function deleteMail(req, res) {
    try {
        let mail = await Mail.findById(req.params.id);
        if (!mail) { return res.status(404).send("Not found!") }
            mail = await Mail.findByIdAndDelete(req.params.id);
            res.json({ "Success": "Payment has been deleted.", mail });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}


module.exports = {
    sendEmail,
    getMail,
    deleteMail
}

