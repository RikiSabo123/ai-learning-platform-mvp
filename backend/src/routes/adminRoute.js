const express=require('express');
const router=express.Router();
const adminController=require('../controllers/adminController');
const { protect, adminOnly } = require('../middlewares/authMW');

//Get all users for admin
router.get('/users', protect, adminOnly,adminController.getAllUsers);
//Get all prompts for admin
router.get('/prompts', protect, adminOnly, adminController.getAllPromptsForAdmin);
module.exports=router;
