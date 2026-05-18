'use strict';

require('dotenv').config();

module.exports = {
  async up(queryInterface, Sequelize) {
    const adminPhone = process.env.ADMIN_PHONE || 'admin';
    const adminName = process.env.ADMIN_NAME || 'Admin';
    const adminRole = process.env.ADMIN_ROLE || 'admin';
    const [results] = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" WHERE phone = :phone LIMIT 1`,
      { replacements: { phone: adminPhone }, type: Sequelize.QueryTypes.SELECT }
    );

    if (!results) {
      await queryInterface.bulkInsert('Users', [
        {
          name: adminName,
          phone: adminPhone,
          role: adminRole
        }
      ], {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { phone: process.env.ADMIN_PHONE || 'admin' }, {});
  }
};
