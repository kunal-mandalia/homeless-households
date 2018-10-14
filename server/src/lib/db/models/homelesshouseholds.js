'use strict';
module.exports = (sequelize, DataTypes) => {
  const homelessHouseholds = sequelize.define('homeless_households', {
    age: DataTypes.INTEGER,
    createdAt: {
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
      type: DataTypes.DATE,
    },
    decision: DataTypes.STRING,
    decisionCode: DataTypes.INTEGER,
    decisionDate: DataTypes.DATE,
    ethnicity: DataTypes.STRING,
    nationality: DataTypes.STRING,
    need: DataTypes.STRING,
    publisherLabel: DataTypes.STRING,
    publisherUri: DataTypes.STRING,
    reason: DataTypes.STRING,
    registrationDate: DataTypes.DATE,
    updatedAt: {
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
      type: DataTypes.DATE,
    },
  }, {});
  homelessHouseholds.associate = function(models) {
    // associations can be defined here
  };
  return homelessHouseholds;
};