const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.post('/login', userController.loginUser);
userRouter.post('/register', userController.registerUser);
userRouter.post('/verify-otp', userController.verifyOtpAndRegister);

module.exports = userRouter;
