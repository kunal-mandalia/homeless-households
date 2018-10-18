import models from '../db';
import { IHomelessHouseholdsAttributes } from '../db/models/homelessHouseholds';

interface IHomelessHouseholdsInput {
  input: {
    limit: number;
    offset: number;
  }
}

interface IResolver {
  getHomelessHouseholds(input: IHomelessHouseholdsInput): Promise<IHomelessHouseholdsAttributes[]>;
}

const resolver: IResolver = {
  getHomelessHouseholds: async ({ input: { limit = 10, offset = 0 } }) => {
    const records = await models.HomelessHouseholds
      .findAll({
        limit,
        offset,
        order: [
          ['decisionDate', 'DESC'],
          ['registrationDate', 'DESC']
        ]
      })
      .map(record => record.get({ plain: true }))
    return records;
  }
}

export {
  resolver
}
