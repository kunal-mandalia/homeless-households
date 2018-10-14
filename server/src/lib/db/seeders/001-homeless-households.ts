import { QueryInterface } from "sequelize";

const data = [
  {
    age: 42,
    createdAt: new Date(),
    decision: 'DataTypes.STRING',
    decisionCode: 0,
    decisionDate: new Date(),
    ethnicity: 'DataTypes.STRING',
    nationality: 'DataTypes.STRING',
    need: 'DataTypes.STRING',
    publisherLabel: 'DataTypes.STRING',
    publisherUri: 'DataTypes.STRING',
    reason: 'DataTypes.STRING',
    registrationDate: new Date(),
    updatedAt: new Date(),
  }
];

export default {
  down: (queryInterface: QueryInterface) => queryInterface.bulkDelete("homeless_households", {}, {}),
  up: (queryInterface: QueryInterface) => queryInterface.bulkInsert("homeless_households", data, {}),
}
