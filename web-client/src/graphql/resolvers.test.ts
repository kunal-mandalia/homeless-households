import {
  GET_FILTERS,
  GET_HOMELESS_HOUSEHOLDS,
} from '../queries';
import { filters } from './__fixtures__/filters';
import { homelessHouseholds } from './__fixtures__/homelessHouseholds'
import { resolvers } from './resolvers';

describe('resolvers', () => {
  it('should updateFilter correctly', () => {
    // arrange
    const parent = {};
    const args = {
      input: {
        filterName: "need",
        filterValue: "vulnerable - physical"
      }
    };
    const context = {
      cache: {
        readQuery: ({ query }: { query: any }) => {
          if (query === GET_FILTERS) {
            return { filters };
          }
          if (query === GET_HOMELESS_HOUSEHOLDS) {
            return { homelessHouseholds };
          }
          return null;
        },
        writeQuery: jest.fn(),
      }
    }
    // act
    resolvers.Mutation.updateFilter(parent, args, context);
    // assign
    expect(context.cache.writeQuery).toHaveBeenCalledTimes(2);
    expect(context.cache.writeQuery.mock.calls[0][0]).toMatchObject({
      data: {
        filters: {
          ...filters,
          need: "vulnerable - physical"
        }
      }
    })
    expect(context.cache.writeQuery.mock.calls[1][0]).toMatchObject({
      data: {
        filteredHomelessHouseholds: [
          {
            age: 31,
            decision: "no priority need",
            decisionCode: 3,
            decisionDate: "2015-09-30T00:00:00.000Z",
            ethnicity: "Other",
            id: 7158,
            nationality: "Not Rec",
            need: "vulnerable - physical",
            reason: "eviction - parents",
          },
        ]
      }
    })
  })
})
