const { validationResult } = require('express-validator');
const Wish = require('../models/Wishlist');


// ADD TO CART

async function addToWish(req, res) {
    try {
        const errors = validationResult(req);
        // Checking if validations are fulfilled
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const item = new Wish({
            product: req.params.id,
            user: req.user.id,
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



// RETRIEVE CART ITEMS

async function getWishes(req, res) {
    try {
        const items = await Wish.find({ user: req.user.id })
        res.json(items);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}



// DELETE CART ITEM

async function deleteWish(req, res) {
    try {
        let item = await Wish.findById(req.params.id);
        if (!item) { return res.status(404).send("Not found!") }
        if (item.user.toString() == req.user.id) {
            item = await Wish.findByIdAndDelete(req.params.id);
            res.json({ "Success": "Item has been deleted from cart.", item: item });
        } else if (item.user.toString() != req.user.id) {
            return res.status(401).send("Not allowed!")
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}


// EMPTY CART 

async function emptyWish(req, res) {
    try {
        await Wish.deleteMany({user: req.user.id})
        res.send("Success")
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}


module.exports = {
    getWishes,
    addToWish,
    deleteWish,
    emptyWish
}

