import { GET_FILTERS } from '../queries';

export const defaults = {
  filters: {
    __typename: "Filters",
    ageRange: [-Infinity, +Infinity],
    decision: null,
    ethnicity: null,
    nationality: null,
    need: null,
    reason: null,
  },
};

interface IUpdateFilterInput {
  filterName: string;
  filterValue: any;
}

interface IMutation {
  updateFilter(parent: any, args: { input: IUpdateFilterInput }, context: any): boolean;
}

interface IResolvers {
  Mutation: IMutation;
}


export const resolvers: IResolvers = {
  Mutation: {
    updateFilter: (_, { input: { filterName, filterValue } }, { cache }) => {
      const previousState = cache.readQuery({ query: GET_FILTERS });
  
      const data = {
        filters: {
          ...previousState.filters,
          [filterName]: filterValue || null,
          __typename: 'Filters',
        }
      };

      cache.writeQuery({
        data,
        query: GET_FILTERS,
      });

      return true;
    }
  },
};
