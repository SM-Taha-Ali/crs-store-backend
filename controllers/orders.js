const { validationResult } = require('express-validator');
const Orders = require('../models/Orders');


// CREATE ORDER

async function makeOrder(req, res) {
    try {
        const errors = validationResult(req);
        // Checking if validations are fulfilled
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const order = new Orders({
            user: req.user.id,
            product: req.params.id,
            status: req.body.status
        })
        const savedOrder = await order.save();
        res.json(savedOrder);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}



// RETRIEVE PRODUCTS

async function getOrders(req, res) {
    try {
        const orders = await Orders.find()
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}



// UPDATE PRODUCT

async function updateOrder(req, res) {
    try {
        let order = await Orders.findById(req.params.id);
        if (!order) { return res.status(404).send("Not found!") }
        const { status } = req.body;
        const newOrder = {};
        if (status) { newOrder.status = status }
        order = await Orders.findByIdAndUpdate(req.params.id, { $set: newOrder }, { new: true })
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}


// DELETE PRODUCT

async function deleteOrder(req, res) {
    try {
        let order = await Orders.findById(req.params.id);
        if (!order) { return res.status(404).send("Not found!") }
            order = await Orders.findByIdAndDelete(req.params.id);
            res.json({ "Success": "Order has been deleted.", order: order });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}


module.exports = {
    getOrders,
    makeOrder,
    updateOrder,
    deleteOrder
}

