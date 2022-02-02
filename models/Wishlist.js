const mongoose = require('mongoose');
const { Schema } = mongoose;

const Wishlist = new Schema({
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
    price: {
        type: Number,
        required: true
    }
});

const Wish = mongoose.model('wish',Wishlist)

module.exports = Wish;
