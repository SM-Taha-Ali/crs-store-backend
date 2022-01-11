const mongoose = require('mongoose');
const { Schema } = mongoose;

const PaymentSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
});

const Payment = mongoose.model('payment',PaymentSchema)

module.exports = Payment;
