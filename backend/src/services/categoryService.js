const { Category ,SubCategory} = require('../models');
//get all categorty
exports.getCategories = async () => {
    const categories = await Category.findAll();
    return categories;
};
//get sub-categories by category id
exports.getSubCategoriesByCategoryId = async (categoryId) => {
    const subCategories = await SubCategory.findAll({
        where: { categoryId },
        order: [['id', 'ASC']],
        attributes: ['id', 'name', 'categoryId']
    });

    if (!subCategories || subCategories.length === 0) {
        throw new Error('Category not found or has no subcategories');
    }

    const seenNames = new Set();
    const uniqueSubCategories = [];

    for (const sub of subCategories) {
        if (!sub.name || seenNames.has(sub.name)) continue;
        seenNames.add(sub.name);
        uniqueSubCategories.push(sub);
    }

    return uniqueSubCategories;
}
//get sub-category by id
exports.getSubCategoryById = async (subCategoryId) => {
    const subCategory = await SubCategory.findByPk(subCategoryId);
    if (!subCategory) {
        throw new Error('Sub-category not found');
    }
    return subCategory;
}
