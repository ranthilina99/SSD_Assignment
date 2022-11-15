const express = require('express');
const router = express.Router();
const controller = require('../controllers/fileUploadController');

module.exports = function () {
    router.post('/create_file',controller.CreateFile);
    return router;
}