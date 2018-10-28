// import gql from 'graphql-tag';

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

export const resolvers = {
  Mutation: {
    // updateFilter: (_, { text }, { cache }) => {
    //   const query = gql`
    //     query GetFilters {
    //       filters @client {
    //         ageRange
    //         decision
    //         ethnicity
    //         nationality
    //         need
    //         reason
    //       }
    //     }
    //   `;
    //   const previous = cache.readQuery({ query });
    //   // const newTodo = {
    //   //   id: nextTodoId++,
    //   //   text,
    //   //   completed: false,
    //   //   __typename: 'TodoItem',
    //   // };
    //   const data = {
    //     filters: previous.filters
    //   };
    //   cache.writeData({ data });
    //   return {};
    // },
  },
};
