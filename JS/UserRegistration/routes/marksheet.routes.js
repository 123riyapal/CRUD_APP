const express = require('express')
const { verifyToken, restrictTo } = require('../middleware/auth');
const upload = require('../middleware/file.middleware');
const { uploadMarksheet, pdfMarksheet, studentMarksheet } = require('../Controllers/markSheetController');
const { Users } = require('../utils/Users');
const router=express.Router();
router.post('/upload', verifyToken, restrictTo(Users.ADMIN, Users.TEACHER), upload.single('file'), uploadMarksheet);
router.get('/student', verifyToken, restrictTo(Users.ADMIN, Users.TEACHER, Users.STUDENT), studentMarksheet);
router.get('/pdf', verifyToken, restrictTo(Users.ADMIN, Users.TEACHER, Users.STUDENT), pdfMarksheet);

module.exports = router;
