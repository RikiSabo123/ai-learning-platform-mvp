const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');
const { validateBody,validateParams, userIdParamSchema,userRegistrationSchema } = require('../middlewares/inputValidMW');
const { protect, adminOnly } = require('../middlewares/authMW');
//register
router.post('/register', validateBody(userRegistrationSchema), userController.register);
//login
router.post('/login', userController.login);
//logout
router.post('/logout', protect, userController.logout);
//Get user history
router.get('/history',protect,validateParams(userIdParamSchema),userController.getUserHistory);
//Get all users for admin
router.get('/all',protect, adminOnly, userController.getAllUsersForAdmin);
module.exports=router;


