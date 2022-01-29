const express = require('express');
const { body } = require('express-validator');
const productsController = require('../controllers/products');
const fetchuser = require('../middlewares/fetchUser');

const router = express.Router();

// CREATE NOTE
router.post('/addproduct',
    [
        body('name', 'This field is required.').isLength({ min: 2 }),
        body('description', 'This field is required.').isLength({ min: 2 }),
        body('price', 'This field is required.').isLength({ min: 1 }),
        body('category', 'This field is required.').isLength({ min: 1 }),
        body('quantity', 'This field is required.').isLength({ min: 1 }),
    ],
    productsController.addProduct
);

// RETRIEVE NOTES
router.get('/getproduct', productsController.getProduct);

// UPDATE NOTE
router.put('/updateproduct/:id', productsController.updateProduct);

// DELETE NOTE
router.delete('/deleteproduct/:id', productsController.deleteProduct);

// GET PRODUCT DETAIL
router.get('/getproductdetails/:id', productsController.getProductDetails);

module.exports = router; 