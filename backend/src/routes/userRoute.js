const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');

//register
router.post('/register',userController.register);
//Get user history
router.get('/history/:id',userController.getUserHistory);
//Get all users for admin
router.get('/all',userController.getAllUsersForAdmin);
module.exports=router;