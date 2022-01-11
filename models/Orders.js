const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrdersSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    status: {
        type: String,
        default: "",
    }
});

const Orders = mongoose.model('orders',OrdersSchema)

module.exports = Orders;
