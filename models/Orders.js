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
        type: String,
        required: true
    },
    postal_code: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: '1',
    },
    date: {
        type: Date
    }
});

const Orders = mongoose.model('orders',OrdersSchema)

module.exports = Orders;
