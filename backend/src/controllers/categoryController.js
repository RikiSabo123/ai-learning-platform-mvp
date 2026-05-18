const categoryService = require('../services/categoryService');

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await categoryService.getCategories();
        res.status(200).json({ categories });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories' });
    }
};

// Get sub-categories by category id
exports.getSubCategoriesByCategoryId = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const subCategories = await categoryService.getSubCategoriesByCategoryId(categoryId);
        res.status(200).json({ subCategories });
    } catch (error) {
        next(error);
    }
};
// Get sub-category by id
exports.getSubCategoryById = async (req, res, next) => {
    try {
        const subCategoryId = req.params.id;
        const subCategory = await categoryService.getSubCategoryById(subCategoryId);
        res.status(200).json({ subCategory });
    } catch (error) {
        next(error);
    }
};