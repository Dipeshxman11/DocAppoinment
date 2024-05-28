const express = require('express');
const router = express.Router();
const channelController = require('../controllers/channelController');

router.get('/', channelController.getChannels);
router.post('/', channelController.createChannel);


module.exports = router;
