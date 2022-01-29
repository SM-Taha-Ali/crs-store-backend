const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Cart = mongoose.model('cart',CartSchema)

module.exports = Cart;
