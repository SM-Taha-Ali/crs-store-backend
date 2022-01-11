const express = require('express');
const { body } = require('express-validator');
const ordersController = require('../controllers/orders');
const fetchuser = require('../middlewares/fetchUser');

const router = express.Router();

// MAKE ORDER
router.post('/makeorder/:id',
    fetchuser,
    ordersController.makeOrder
);

// RETRIEVE ORDERS
router.get('/getorders', ordersController.getOrders);

// UPDATE ORDER
router.put('/updateorder/:id', ordersController.updateOrder);

// DELETE ORDER
router.delete('/deleteorder/:id', ordersController.deleteOrder);

module.exports = router; 