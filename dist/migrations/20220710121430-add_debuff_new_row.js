"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return Promise.all([queryInterface.addColumn('debuff', 'new', {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    })]);
  },
  down: function down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('debuff', 'new')]);
  }
};