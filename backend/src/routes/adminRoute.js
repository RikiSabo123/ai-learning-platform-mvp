const express=require('express');
const router=express.Router();
const adminController=require('../controllers/adminController');

//Get all users for admin
router.get('/users',adminController.getAllUsersForAdmin);
//Get all prompts for admin
router.get('/prompts',adminController.getAllPromptsForAdmin);
module.exports=router;