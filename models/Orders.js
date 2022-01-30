const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrdersSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    products: {
        type: Array,
        default: []
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    postal_code: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "Packed",
    }
});

const Orders = mongoose.model('orders',OrdersSchema)

module.exports = Orders;
