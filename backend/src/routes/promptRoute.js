const express=require('express');
const router=express.Router();
const promptController=require('../controllers/promptController');
const { validateBody,validateParams, userIdParamSchema,promptSchema } = require('../middlewares/inputValidMW');
const { protect, adminOnly } = require('../middlewares/authMW');

//Create a new prompt
router.post('/create',protect, validateBody(promptSchema), promptController.streamLesson);
//Get user history
router.get('/history', protect, promptController.getUserHistory);
router.get('/history/:userId', protect, promptController.getUserHistory);
//Get all prompts for admin
router.get('/all', protect, adminOnly, promptController.getAllPromptsForAdmin);
//Get prompt by id
router.get('/getById',protect,validateParams(userIdParamSchema),promptController.getPromptById);

module.exports=router;


