const mongoose = require('mongoose');
const { Schema } = mongoose;

const PaymentSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders'
    },
    owner: {
        type: String,
        default: null
    },
    card_number:{
        type: Number,
        default: null
    },
    ccv: {
        type: Number,
        default: null
    },
    card_expiry: {
        type: Date,
        default: null
    },
    total_price: {
        type: Number,
        required: true
    }
});

const Payment = mongoose.model('payment',PaymentSchema)

module.exports = Payment;
