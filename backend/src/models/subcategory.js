'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
  // חיבור לקטגוריה 
  this.belongsTo(models.Category, {
    foreignKey: 'categoryId',
    as: 'category'
  });

  // אם הגדרת פה גם קשר לפרומפטים
  this.hasMany(models.Prompt, {
    foreignKey: 'subCategoryId',
    as: 'prompts'
  });
}
  }
  SubCategory.init({
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SubCategory',
    timestamps: false
  });
  return SubCategory;
};