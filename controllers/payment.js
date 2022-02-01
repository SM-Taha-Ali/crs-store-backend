const { validationResult } = require('express-validator');
const Payment = require('../models/Payment');


// MAKE PAYMENT

async function makePayment(req, res) {
    try {
        const payment = new Payment({
            user: req.user.id,
            order: req.params.id,
            owner: req.body.owner,
            card_number: req.body.card_number,
            ccv: req.body.ccv,
            card_expiry: req.body.card_expiry,
        })
        const savedPayment = await payment.save();
        res.json(savedPayment);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}



// RETRIEVE PRODUCTS

async function getPayment(req, res) {
    try {
        const payment = await Payment.find()
        res.json(payment);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}



// UPDATE PRODUCT

// async function updatePayment(req, res) {
//     try {
//         let payment = await Payment.findById(req.params.id);
//         if (!payment) { return res.status(404).send("Not found!") }
//         const newOrder = {};
//         if (status) { newOrder.status = status }
//         order = await Orders.findByIdAndUpdate(req.params.id, { $set: newOrder }, { new: true })
//         res.json(order);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Internal server error")
//     }
// }


// DELETE PRODUCT

async function deletePayment(req, res) {
    try {
        let payment = await Payment.findById(req.params.id);
        if (!payment) { return res.status(404).send("Not found!") }
            payment = await Payment.findByIdAndDelete(req.params.id);
            res.json({ "Success": "Payment has been deleted.", payment: payment });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}


module.exports = {
    getPayment,
    makePayment,
    deletePayment
}

