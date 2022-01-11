const express = require('express');
const { body } = require('express-validator');
const cartController = require('../controllers/cart');

const router = express.Router();

// ADD TO CART
router.post('/addtocart/:id',
    cartController.addToCart
);

// RETRIEVE ORDERS
router.get('/getitem', cartController.getItem);

// UPDATE ORDER
router.put('/updateitem/:id', cartController.updateItem);

// DELETE ORDER
router.delete('/deleteitem/:id', cartController.deleteItem);

module.exports = router; 