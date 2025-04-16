const express = require('express');
const router = express.Router();
const { userValidation, loginValidation } = require('../middleware/userValidation.middleware');
const { registerUser, loginUser } = require('../Controllers/authController');

router.post('/register', userValidation, registerUser);
router.post('/login', loginValidation, loginUser);

module.exports = router;