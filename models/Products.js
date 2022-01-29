const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
});

const Products = mongoose.model('products',ProductsSchema)

module.exports = Products;
