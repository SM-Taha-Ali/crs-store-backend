const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    quantity: {
        type: Number,
        required: true
    },
});

const Cart = mongoose.model('cart',CartSchema)

module.exports = Cart;
