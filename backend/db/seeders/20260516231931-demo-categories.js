'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('Categories', [
      { name: 'מדע'},
      { name: 'שפות'},
      { name: 'טכנולוגיה'},
      { name: 'היסטוריה'},
      { name: 'עסקים'},
      { name: 'אמנות'},

      { name: 'בריאות וכושר'},
      { name: 'פסיכולוגיה'},
      { name: 'חינוך ולמידה'},
      { name: 'כסף והשקעות'},
      { name: 'יזמות וסטארטאפים'}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};