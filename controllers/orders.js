const { validationResult } = require('express-validator');
const Orders = require('../models/Orders');


// PLACE ORDER

async function makeOrder(req, res) {
    try {
        const order = new Orders({
            user: req.user.id,
            products: req.body.products,
            status: req.body.status,
            address: req.body.address,
            contact: req.body.contact,
            postal_code: req.body.postal_code,
            city: req.body.city
        })
        const savedOrder = await order.save();
        res.json(savedOrder);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}



// RETRIEVE ALL ORDERS

async function getOrders(req, res) {
    try {
        const orders = await Orders.find()
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}

// RETRIEVE ORDERS OF SPECIFIC USER

async function getOrder(req, res) {
    try {
        const orders = await Orders.find({ user: req.user.id })
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}



// UPDATE ORDER ADMIN SIDE

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


// DELETE ORDER ADMIN SIDE

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


// DELETE ORDER USER SIDE

async function deleteOrderUser(req, res) {
    try {
        let order = await Orders.findById(req.params.id);
        if (!order) { return res.status(404).send("Not found!") }
        if (order.user.toString() == req.user.id) {
            order = await Orders.findByIdAndDelete(req.params.id);
            res.json({ "Success": "Order has been deleted.", order: order });
        } else if (item.user.toString() != req.user.id) {
            return res.status(401).send("Not allowed!")
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}


module.exports = {
    getOrders,
    getOrder,
    makeOrder,
    updateOrder,
    deleteOrder,
    deleteOrderUser
}

