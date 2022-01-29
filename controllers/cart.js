const { validationResult } = require('express-validator');
const Cart = require('../models/Cart');


// CREATE ORDER

async function addToCart(req, res) {
    try {
        const errors = validationResult(req);
        // Checking if validations are fulfilled
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const item = new Cart({
            product: req.params.id,
            user: req.user.id,
            quantity: req.body.quantity,
            price: req.body.price,
            name: req.body.name
        })
        const savedItem = await item.save();
        res.json(savedItem);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}



// RETRIEVE PRODUCTS

async function getItem(req, res) {
    try {
        const items = await Cart.find({ user: req.user.id })
        res.json(items);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}



// UPDATE PRODUCT

async function updateItem(req, res) {
    try {
        let item = await Cart.findById(req.params.id);
        if (!item) { return res.status(404).send("Not found!") }
        if (item.user.toString() == req.user.id) {
            const { quantity } = req.body;
            const { price } = req.body;
            const { name } = req.body;
            const newItem = {};
            if (quantity) { newItem.quantity = quantity }
            if (price) { newItem.price = price }
            if (name) { newItem.name = name }
            item = await Cart.findByIdAndUpdate(req.params.id, { $set: newItem }, { new: true })
            res.json(newItem);
        } else if (item.user.toString() != req.user.id) {
            return res.status(401).send("Not allowed!")
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}




// DELETE PRODUCT

async function deleteItem(req, res) {
    try {
        let item = await Cart.findById(req.params.id);
        if (!item) { return res.status(404).send("Not found!") }
        if (item.user.toString() == req.user.id) {
            item = await Cart.findByIdAndDelete(req.params.id);
            res.json({ "Success": "Item has been deleted from cart.", item: item });
        } else if (item.user.toString() != req.user.id) {
            return res.status(401).send("Not allowed!")
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}


module.exports = {
    getItem,
    addToCart,
    updateItem,
    deleteItem
}

