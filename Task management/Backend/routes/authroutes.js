const express = require('express');
const router = express.Router();
const { register, login } = require('../routes/controllers/userController');


router.post('/signup', register);

router.post('/login', login);

module.exports = router;
