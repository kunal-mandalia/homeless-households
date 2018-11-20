import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
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

const COLORS = {
  "alcohol dependency": "#49da9a",
  "care leaver under 21 yrs": "#e6261f",
  "dependent children": "#a3e048",
  "domestic violence/ threat": "#34bbe6",
  "drug dependency": "#4355db",
  "emergency-fire/flood etc": "#eb7532",
  "former refugee/ex-asylum": "#d23be7",

  "no priority need": "#E0BE36",
  "pregnant": "#75B09C",
  "vulnerable": "#628395",
  "young person 16/17 yrs": "#D8F793",
}

const PieWrapper = styled.div`
  width: 100%;
  height: 100%;
`

export function prepareDataset(filteredHomelessHouseholds: IHomelessHouseholds[], homelessHouseholds: IHomelessHouseholds[], isFiltered: boolean) {
  const hh = isFiltered ?  filteredHomelessHouseholds : homelessHouseholds;

  const applicantFrequencyByNeed = hh.reduce((acc, cur, index) => {
    let need = cur.need;

    // group vulnerable needs
    if (need.indexOf('vulnerable') !== -1) {
      need = 'vulnerable';
    }
    if (acc[need]) {
      acc[need] = acc[need] + 1;
      return acc;
    }
    acc[need] = 1;
    return acc;    
  }, {})
  
  return Object.keys(applicantFrequencyByNeed).map(need => ({
    name: need,
    value: applicantFrequencyByNeed[need]
  }))
}

export const Need = ({ getHomelessHouseholds, getFilteredHomelessHouseholds, getFilters }: IProps) => {
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

  return (
      <PieWrapper>
        <ResponsiveContainer aspect={1}>
          <PieChart>
          <Legend verticalAlign="top" align="left" height={50} layout="horizontal" />
            <Pie
              data={data} 
              cx="50%"
              cy="50%"
              innerRadius="50%"
              outerRadius="60%" 
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label={true}
              animationDuration={1000}
            >
              {
                data.map((entry) => <Cell key={entry.name} fill={COLORS[entry.name]} />)
              }
            </Pie>
          </PieChart>
          </ResponsiveContainer>
      </PieWrapper>
  )
}

export const NeedWithData = compose(
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
)(Need)

export default Tile(NeedWithData)("Need");