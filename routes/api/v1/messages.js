const express = require('express');
const router = express.Router();
const messageController = require('../../../controllers/api/v1/messages');

// post messages
router.post('/', messageController.create);

// get messages
router.get('/', messageController.index);

//export router
module.exports = router;