const express = require('express')
const {verification} = require('../middleware/user.middleware'); 
const {userValidation} = require('../middleware/userValidation.middleware')
const {loginValidation} = require('../middleware/loginValidation')

const router = express.Router();
const {registerUser , loginUser , userInfo, modifyUser, updateUser }=require('../Controllers/user.controller')
router.post('/register',userValidation,registerUser);
router.patch('/users',userValidation,verification,modifyUser);
router.put('/update',userValidation,verification,updateUser);
router.post('/login',loginValidation,loginUser);
router.get('/me', verification, userInfo);  
module.exports = router; 