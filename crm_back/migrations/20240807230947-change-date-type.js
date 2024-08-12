'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('tasks', 'timedeadline', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('tasks', 'timefinish', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('tasks', 'timedeadline', {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.changeColumn('tasks', 'timefinish', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
