const express=require('express');
const router=express.Router();
const categoryController=require('../controllers/categoryController');

//Get all categories
router.get('/all',categoryController.getCategories);
//Get subcategories by category id
router.get('/subcategoriesByCategoryId/:id',categoryController.getSubCategoriesByCategoryId);
//Get subcategory by id
router.get('/subcategoriesById/:id',categoryController.getSubCategoryById);

module.exports=router;

