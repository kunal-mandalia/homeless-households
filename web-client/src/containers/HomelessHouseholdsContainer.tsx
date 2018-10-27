import * as React from 'react';
import { HomelessHouseholds } from '../components/HomelessHouseholds';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { GET_HOMELESS_HOUSEHOLDS, QueryGetHomelessHouseholds } from '../graphql/queries/getHomelessHouseholds';

interface IState {
  filters: IFilters;
}

const filterNullableValue = (record: IHomelessHouseholds, filters: IFilters) => (filterAttribute: FilterAttribute): boolean => {
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

export class HomelessHouseholdsContainer extends React.Component<{}, IState> {
  public state = {
    filters: {
      ageRange: [-Infinity, +Infinity],
      decision: null,
      ethnicity: null,
      nationality: null,
      need: null,
      reason: null,
    }
  }

  public filterData = (data: IHomelessHouseholds[]): IHomelessHouseholds[] => {
    const { filters } = this.state;
    return data.filter(record => {
      const nullableFilter = filterNullableValue(record, filters)
      return (
        nullableFilter('decision') &&
        nullableFilter('need') &&
        nullableFilter('reason') &&
        nullableFilter('ageRange') &&
        nullableFilter('ethnicity') &&
        nullableFilter('nationality')
      )
    })
  }

  public handleFilterChange = (filterAttribute: FilterAttribute, value: any) => {
    this.setState(prevState => {
      return {
        filters: {
          ...prevState.filters,
          [filterAttribute]: value
        }
      }
    })
  }

  public render() {
    return (
      <QueryGetHomelessHouseholds query={GET_HOMELESS_HOUSEHOLDS}>
      {({ loading, error, data }) => {
        if (loading) { return <LoadingIndicator /> };
        if (error) { return <p>Error :(</p> };
        if (!data) { return null };
        const { getHomelessHouseholds } = data;
        const filteredData = this.filterData(getHomelessHouseholds);
        const count = filteredData.length;
        const total = getHomelessHouseholds.length;

        return (
          <HomelessHouseholds
            count={count}
            data={getHomelessHouseholds}
            filteredData={filteredData}
            filters={this.state.filters}
            handleFilterChange={this.handleFilterChange}
            total={total}
          />
        )
      }}
      </QueryGetHomelessHouseholds>
    )
  }
}

