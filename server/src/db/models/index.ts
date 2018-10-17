import * as path from 'path';
import * as Sequelize from 'sequelize';
import HomelessHouseholdsFactory from './homelessHouseholds';

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';
import configs = require('../../config/db.js');
const config = configs[env];

if (
  !config.database || !config.username || !config.password || !config.dialect || !config.host
) {
  throw new Error(`Bad environment variables: ${JSON.stringify(process.env, null, 4)}`);
}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password, {
    dialect: config.dialect,
    host: config.host,
    operatorsAliases: false,
    pool: {
      acquire: 30000,
      idle: 10000,
      max: 5,
      min: 0,
    }
});

const db = {
  HomelessHouseholds: HomelessHouseholdsFactory(sequelize),
  Sequelize,
  sequelize,
};

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;