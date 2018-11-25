import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import styled from 'styled-components';
import {
  GET_FILTERED_HOMELESS_HOUSEHOLDS,
  GET_FILTERS,
  GET_HOMELESS_HOUSEHOLDS,
} from '../../queries';
import { limitStringLength } from '../../util'
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

const NeedToolTip = styled.div`
  color: black;
  border: solid 1px grey;
  background-color: white;
  padding: 15px;
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
  
  return Object.keys(applicantFrequencyByNeed)
    .map(need => ({
      name: need,
      shortName: limitStringLength(need, 7),
      value: applicantFrequencyByNeed[need]
    }))
    .sort((a,b) => b.value - a.value);
}

function renderTooltip(props: any) {
  if (props.active) {
    const { payload } = props;
    const { name, value } = payload[0].payload;
    return <NeedToolTip>
      {name}: {value}
    </NeedToolTip>
  }
  return null;
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
      <Wrapper>
        <ResponsiveContainer aspect={1}>
          <BarChart
            width={1400}
            height={400}
            data={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            layout="vertical"
          >
            <XAxis type="number" />
            <YAxis dataKey="shortName" type="category" />
            <Tooltip
              content={renderTooltip}
            />
            <Bar dataKey="value" fill="#ff7300" maxBarSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </Wrapper>
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