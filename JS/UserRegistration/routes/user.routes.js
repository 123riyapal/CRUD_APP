const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { userInfo, modifyUser } = require('../Controllers/userInfoController');

router.get('/userInfo', verifyToken,  userInfo);
router.put('/modify', verifyToken, modifyUser);

module.exports = router;