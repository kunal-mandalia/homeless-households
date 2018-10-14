import * as Sequelize from 'sequelize';

const sequelize = new Sequelize(
  'homelessHouseholds',
  'hh_admin',
  '', {
    dialect: 'postgres',
    host: 'localhost',
    operatorsAliases: false,
    pool: {
      acquire: 30000,
      idle: 10000,
      max: 5,
      min: 0,
    }
});

export {
  sequelize as db
}
