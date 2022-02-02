const express = require('express');
const { body } = require('express-validator');
const wishController = require('../controllers/wish');
const fetchuser = require('../middlewares/fetchUser');

const router = express.Router();

// ADD TO CART
router.post('/addtowish/:id',
    fetchuser,
    wishController.addToWish
);

// RETRIEVE CART ITEMS
router.get('/getwish', fetchuser, wishController.getWishes);

// DELETE CART ITEM
router.delete('/deletewish/:id', fetchuser, wishController.deleteWish);

// EMPTY CART
router.delete('/emptywish/', fetchuser, wishController.emptyWish);

module.exports = router; 