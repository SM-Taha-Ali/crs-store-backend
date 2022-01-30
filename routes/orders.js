const express = require('express');
const { body } = require('express-validator');
const ordersController = require('../controllers/orders');
const fetchuser = require('../middlewares/fetchUser');

const router = express.Router();

// MAKE ORDER
router.post('/makeorder',
    fetchuser,
    ordersController.makeOrder
);

// RETRIEVE ORDERS
router.get('/getorders', ordersController.getOrders);

// GET USER SPECIFIC ORDERS
router.get('/getorder', fetchuser, ordersController.getOrder);

// UPDATE ORDER
router.put('/updateorder/:id', ordersController.updateOrder);

// DELETE ORDER
router.delete('/deleteorder/:id', ordersController.deleteOrder);

// DELETE ORDERS OF SPECIFIC USER ONLY
router.delete('/deleteorderuser/:id', fetchuser, ordersController.deleteOrderUser);

module.exports = router; 