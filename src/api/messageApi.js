const express = require('express');
const router = express.Router();
const controller = require('../controllers/messageController');

module.exports = function () {
    router.post('/create_message',controller.CreateMessage );
    router.post('/getMessage',controller.getMessage );
    return router;
}