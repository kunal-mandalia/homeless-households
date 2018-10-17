import models from '../db';

const { HomelessHouseholds } = models;

const resolver = {
  hello: async () => {
    const records = await HomelessHouseholds.findOne({
      where: {
        age: 35
      }
    });
    // console.log(">>> records", records);
    return 'Hello world';
  }
}

export {
  resolver
}
