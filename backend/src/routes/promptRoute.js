const express=require('express');
const router=express.Router();
const promptController=require('../controllers/promptController');

//Create a new prompt
router.post('/create',promptController.createLessonPrompt);
//Get user history
router.get('/history/:id',promptController.getUserHistory);
//Get all prompts for admin
router.get('/all',promptController.getAllPromptsForAdmin);
//Get prompt by id
router.get('/getById/:id',promptController.getPromptById);

module.exports=router;
