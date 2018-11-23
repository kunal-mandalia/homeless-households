import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import styled from 'styled-components';
import {
  GET_FILTERED_HOMELESS_HOUSEHOLDS,
  GET_FILTERS,
  GET_HOMELESS_HOUSEHOLDS,
} from '../../queries';
import { Tile } from './Tile';

interface IProps {
  getFilteredHomelessHouseholds: {
    loading: boolean,
    filteredHomelessHouseholds: IHomelessHouseholds[] | undefined,
  },
  getHomelessHouseholds: {
    loading: boolean,
    homelessHouseholds: IHomelessHouseholds[] | undefined,
  },
  getFilters: {
    filters: IFilters,
    touched: boolean,
  }
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const AGE_RANGES = [
  '< 18',
  '18 - 24',
  '25 - 34',
  '35 - 44',
  '45 - 54',
  '55 - 64',
  ' > 64'
]

function groupHHByAgeRangeX(homelessHouseholds: IHomelessHouseholds[]) {
  const hhByAge = homelessHouseholds.reduce((acc, cur) => {
    const { age } = cur;
    if (age < 18) {
      acc['< 18'] = acc['< 18'] + 1;
    } else if (age < 25) {
      acc['18 - 24'] = acc['18 - 24'] + 1;
    } else if (age < 35) {
      acc['25 - 34'] = acc['25 - 34'] + 1;
    } else if (age < 45) {
      acc['35 - 44'] = acc['35 - 44'] + 1;
    } else if (age < 55) {
      acc['45 - 54'] = acc['45 - 54'] + 1;
    } else if (age < 65) {
      acc['55 - 64'] = acc['55 - 64'] + 1;
    } else {
      acc['> 64'] = acc['> 64'] + 1;
    }
   return acc; 
  }, {
    '< 18': 0,
    // tslint:disable-next-line:object-literal-sort-keys
    '18 - 24': 0,
    '25 - 34': 0,
    '35 - 44': 0,
    '45 - 54': 0,
    '55 - 64': 0,
    '> 64': 0
  })

  return hhByAge;
}

export function prepareDataset(filteredHomelessHouseholds: IHomelessHouseholds[], homelessHouseholds: IHomelessHouseholds[], isFiltered: boolean) {
  const filteredHHByAge = groupHHByAgeRangeX(filteredHomelessHouseholds);
  const hhByAge = groupHHByAgeRangeX(homelessHouseholds);


  return AGE_RANGES.map(ageRange => ({
    all: hhByAge[ageRange],
    filtered: filteredHHByAge[ageRange],
    name: ageRange
  }))
}

export const Age = ({ getHomelessHouseholds, getFilteredHomelessHouseholds, getFilters }: IProps) => {
  const { filteredHomelessHouseholds } = getFilteredHomelessHouseholds;
  const { homelessHouseholds } = getHomelessHouseholds;
  const { filters } = getFilters;

  if (getHomelessHouseholds.loading) {
    return <div>Loading...</div>
  }

  if (!filteredHomelessHouseholds ||  !homelessHouseholds) {
    return <div>No data</div>
  }

  const data = prepareDataset(filteredHomelessHouseholds, homelessHouseholds, filters.touched);
  const dataKey = filters.touched ? "filtered" : "all";

  return (
      <Wrapper>
        <ResponsiveContainer aspect={1}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey={dataKey} fill="#ff5722" />
          </BarChart>
          </ResponsiveContainer>
      </Wrapper>
  )
}

export const AgeWithData = compose(
  graphql(GET_HOMELESS_HOUSEHOLDS, {
    name: 'getHomelessHouseholds',
    options: () => ({
      variables: {
        input: {
          limit: 1000,
          offset: 0,
        }
      },
    })
  }),
  graphql(
    GET_FILTERED_HOMELESS_HOUSEHOLDS, {
      name: 'getFilteredHomelessHouseholds',
    },
  ),
  graphql(GET_FILTERS, { name: 'getFilters' }),
)(Age)

export default Tile(AgeWithData)("Age");