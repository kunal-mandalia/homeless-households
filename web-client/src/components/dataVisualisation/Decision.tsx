import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import styled from 'styled-components';
import { DECISIONS_MAP } from '../../constants';
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

const PieWrapper = styled.div`
  width: 100%;
  height: 100%;
`

const COLORS = {
  "approved permanent rehous": "#49da9a",
  "intentionally homeless": "#e6261f",
  "management transfer": "#a3e048",
  "no priority need": "#34bbe6",
  "not elig, other": "#4355db",
  "not homeless": "#eb7532",
  "resettlement case": "#d23be7",
}

export function prepareDataset(filteredHomelessHouseholds: IHomelessHouseholds[], homelessHouseholds: IHomelessHouseholds[], isFiltered: boolean) {
  const hh = isFiltered ?  filteredHomelessHouseholds : homelessHouseholds;
  const dataSet = Object.keys(DECISIONS_MAP).map(decision => {
    const decisionCount = hh.filter(record => record.decision === decision).length;
    return {
      name: decision.toLowerCase(),
      value: decisionCount
    }
  })
  return dataSet.filter(dataElement => dataElement.value > 0);
}

export const Decision = ({ getHomelessHouseholds, getFilteredHomelessHouseholds, getFilters }: IProps) => {
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
              innerRadius="15%"
              outerRadius="70%" 
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label={true}
            >
              {
                data.map((entry, index) => <Cell key={entry.name} fill={COLORS[entry.name]} />)
              }
            </Pie>
            <Tooltip />
          </PieChart>
          </ResponsiveContainer>
      </PieWrapper>
  )
}

export const DecisionWithData = compose(
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
)(Decision)

export default Tile(DecisionWithData)("Outcomes");
