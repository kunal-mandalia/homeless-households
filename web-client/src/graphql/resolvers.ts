import {
  GET_FILTERED_HOMELESS_HOUSEHOLDS,
  GET_FILTERS,
  GET_HOMELESS_HOUSEHOLDS,
} from '../queries';

export const defaults = {
  filteredHomelessHouseholds: [],
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

interface IFilterHomelessHouseholds {
  homelessHouseholds: IHomelessHouseholds[];
  filters: IFilters;
}

const createNullableFilter = (record: IHomelessHouseholds, filters: IFilters) => (filterAttribute: FilterAttribute): boolean => {
  if (!filters[filterAttribute]) {
    return true;
  }
  if (filterAttribute === 'ageRange') {
    const age = record.age;
    const [min, max] = filters.ageRange;
    return (age >= min) && (age <= max);
  }
  return record[filterAttribute] === filters[filterAttribute];
}

export function filterHomelessHouseholds({ homelessHouseholds, filters }: IFilterHomelessHouseholds): IHomelessHouseholds[] {
  return homelessHouseholds.filter(record => {
    const nullableFilter = createNullableFilter(record, filters);
    return (
      nullableFilter('decision') &&
      nullableFilter('need') &&
      nullableFilter('reason') &&
      nullableFilter('ageRange') &&
      nullableFilter('ethnicity') &&
      nullableFilter('nationality')
    )
  });
}

export const resolvers: IResolvers = {
  Mutation: {
    updateFilter: (store, { input: { filterName, filterValue } }, { cache }) => {
      const previousFilters = cache.readQuery({ query: GET_FILTERS });
      const { homelessHouseholds } = cache.readQuery({ query: GET_HOMELESS_HOUSEHOLDS });

      const nextFilters = {
        filters: {
          ...previousFilters.filters,
          [filterName]: filterValue || null,
          __typename: 'Filters',
        }
      };

      const filteredHomelessHouseholds = filterHomelessHouseholds({ homelessHouseholds, filters: nextFilters.filters });

      cache.writeQuery({
        data: nextFilters,
        query: GET_FILTERS,
      });

      cache.writeQuery({
        data: { filteredHomelessHouseholds },
        query: GET_FILTERED_HOMELESS_HOUSEHOLDS,
      });

      return true;
    }
  },
};
