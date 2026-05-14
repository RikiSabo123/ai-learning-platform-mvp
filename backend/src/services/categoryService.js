const { Category ,subcategory} = require('../models');
//get all categorty
exports.getCategories = async () => {
    const categories = await Category.findAll();
    return categories;
};
//get sub-categories by category id
exports.getSubCategoriesByCategoryId = async (categoryId) => {
    const category = await Category.findByPk(categoryId, {
        include: 'subCategories'
    });
    if (!category) {
        throw new Error('Category not found');
    }
    return category.subCategories;
}
//get sub-category by id
exports.getSubCategoryById = async (subCategoryId) => {
    const subCategory = await subcategory.findByPk(subCategoryId);
    if (!subCategory) {
        throw new Error('Sub-category not found');
    }
    return subCategory;
}
