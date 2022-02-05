const express = require('express');
const { body } = require('express-validator');
const mailsController = require('../controllers/mails');
const fetchuser = require('../middlewares/fetchUser');

const router = express.Router();

// MAKE ORDER
router.post('/sendemail',
    fetchuser,
    mailsController.sendEmail
);

// RETRIEVE ORDERS
router.get('/getmails', mailsController.getMail);

// DELETE ORDER
router.delete('/deletemail/:id', mailsController.deleteMail);


module.exports = router; 