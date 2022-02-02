const { validationResult } = require('express-validator');
const Products = require('../models/Products');


// ADD NEW PRODUCT

async function addProduct(req, res) {
    try {
        const errors = validationResult(req);
        // Checking if validations are fulfilled
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const product = new Products({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            category: req.body.category,
            discount: req.body.discount,
            img: req.body.img
        })
        const savedProduct = await product.save();
        res.json(savedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}



// RETRIEVE PRODUCTS

async function getProduct(req, res) {
    try {
        const products = await Products.find()
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}



// UPDATE PRODUCT

async function updateProduct(req, res) {
    try {
        let product = await Products.findById(req.params.id);
        if (!product) { return res.status(404).send("Not found!") }
        const { name, description, price, quantity, discount, category } = req.body;
        const newProduct = {};
        if (name) { newProduct.name = name }
        if (description) { newProduct.description = description }
        if (price) { newProduct.price = price }
        if (quantity) { newProduct.quantity = quantity }
        if (category) { newProduct.category = category }
        if (discount) { newProduct.discount = discount }
        product = await Products.findByIdAndUpdate(req.params.id, { $set: newProduct }, { new: true })
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}


// DELETE PRODUCT

async function deleteProduct(req, res) {
    try {
        let product = await Products.findById(req.params.id);
        if (!product) { return res.status(404).send("Not found!") }
            product = await Products.findByIdAndDelete(req.params.id);
            res.json({ "Success": "Product has been deleted.", product: product });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}


// GET PRODUCT DETAILS

async function getProductDetails(req, res) {
    try {
        var productID = req.params.id;
        const product = await Products.findById(productID);
        res.send(product);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}


module.exports = {
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductDetails
}

