const express = require('express');
const { body } = require('express-validator');
const paymentController = require('../controllers/payment');
const fetchuser = require('../middlewares/fetchUser');

const router = express.Router();

// MAKE PAYMENT
router.post('/makepayment/:id',
    fetchuser,
    paymentController.makePayment
);

// RETRIEVE PAYMENTS
router.get('/getpayment', paymentController.getPayment);

// // UPDATE ORDER
// router.put('/updatePayment/:id', paymentController.updatePayment);

// DELETE PAYMENT
router.delete('/deletePayment/:id', paymentController.deletePayment);

module.exports = router; 