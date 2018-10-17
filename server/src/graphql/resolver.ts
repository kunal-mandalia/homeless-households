import models from '../db';

const { HomelessHouseholds } = models;

const resolver = {
  getHomelessHouseholds: async () => {
    const records = await HomelessHouseholds
      .findAll({
        where: {
          age: 35
        }
      })
      .map(record => record.get({ plain: true }))
    return records;
  }
}

export {
  resolver
}
