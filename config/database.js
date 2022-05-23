const { Sequelize } = require('sequelize');

module.exports = new Sequelize('codegig', 'seth.king', 'Poiop90lik8!', {
    host: 'localhost',
    dialect:  'postgres' 
  });