import { Form, Icon, Select, Slider } from 'antd';
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import styled from 'styled-components';
import {
  GET_FILTERS,
  GET_HOMELESS_HOUSEHOLDS,
  UPDATE_FILTER
} from '../queries';
import { LoadingIndicator } from './LoadingIndicator'

const FormItem = Form.Item;
const { Option } = Select;

interface IProps {
  getHomelessHouseholds: {
    loading: boolean,
    homelessHouseholds: IHomelessHouseholds[] | undefined,
  },
  getFilters: {
    loading: boolean,
    filters: IFilters
  },
  updateFilter: (input: any) => void,
}

const FiltersWrapper = styled.div`
  padding: 2em;
`

// @ts-ignore
const SelectWrapper = styled(Select)`
  width: 100%;
`

const formItemLayout = {
  labelCol: {
    sm: { span: 6 },
    xs: { span: 24 },
  },
  wrapperCol: {
    sm: { span: 18 },
    xs: { span: 24 },
  },
};

const createFilterUpdateAction = (mutate: (options: any) => void) => (filterName: string = 'need') => (value: string | number | number[]) => {
  mutate({ variables: { input: { filterName, filterValue: value }}})
}

export const FiltersX: React.SFC<IProps> = (props) => {
  const { getFilters, getHomelessHouseholds, updateFilter } = props;
  const handleUpdateFilter = createFilterUpdateAction(updateFilter);
  if (getHomelessHouseholds.loading || !getHomelessHouseholds.homelessHouseholds) {
    return <LoadingIndicator />
  }

  // TODO: decide upfront or compute in a reduce instead of mapping over the
  // same array multiple times
  const decisions = [...new Set(getHomelessHouseholds.homelessHouseholds.map(record => record.decision))]
    .sort((a,b) => a.localeCompare(b));

  const needs = [...new Set(getHomelessHouseholds.homelessHouseholds.map(record => record.need))]
    .sort((a,b) => a.localeCompare(b));

  const reasons = [...new Set(getHomelessHouseholds.homelessHouseholds.map(record => record.reason))]
    .sort((a,b) => a.localeCompare(b));

  const ethnicities = [...new Set(getHomelessHouseholds.homelessHouseholds.map(record => record.ethnicity))]
    .sort((a,b) => a.localeCompare(b));

  const nationalities = [...new Set(getHomelessHouseholds.homelessHouseholds.map(record => record.nationality))]
    .sort((a,b) => a.localeCompare(b));

  const ages = getHomelessHouseholds.homelessHouseholds.map(record => Math.round(record.age));
  const minAge = Math.min(...ages);
  const maxAge = Math.max(...ages);

    return <FiltersWrapper data-testid='filters'>
      <h1><Icon type="home" theme="outlined" /> homeless households</h1>
      <br />
      <FormItem
        {...formItemLayout}
        label="Decision"
      >
        <SelectWrapper
          allowClear={true}
          onChange={handleUpdateFilter('decision')}
        >
          {decisions.map(decision => {
            return <Option key={decision} value={decision}>
              {decision.toLowerCase()}
            </Option>
          })}
        </SelectWrapper>
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="Need"
      >
        <SelectWrapper
          allowClear={true}
          onChange={handleUpdateFilter('need')}
        >
          {needs.map(need => {
            return <Option key={need} value={need}>
              { need.toLowerCase() }
            </Option>
          })}
        </SelectWrapper>
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="Reason"
      >
        <SelectWrapper
          allowClear={true}
          onChange={handleUpdateFilter('reason')}
        >
          {reasons.map(reason => {
            return <Option key={reason} value={reason}>
              { reason.toLowerCase() }
            </Option>
          })}
        </SelectWrapper>
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="Age"
      >
        <Slider
          min={minAge}
          max={maxAge}
          range={true}
          value={[getFilters.filters.ageRange[0], getFilters.filters.ageRange[1]]}
          onChange={handleUpdateFilter('ageRange')}
        />
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="Ethnicity"
      >
        <SelectWrapper
          allowClear={true}
          onChange={handleUpdateFilter('ethnicity')}
        >
          {ethnicities.map(ethnicity => {
            return <Option key={ethnicity} value={ethnicity}>
              { ethnicity.toLowerCase() }
            </Option>
          })}
        </SelectWrapper>
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="Nationality"
      >
        <SelectWrapper
          allowClear={true}
          onChange={handleUpdateFilter('nationality')}
        >
          {nationalities.map(nationality => {
            return <Option key={nationality} value={nationality}>
              { nationality.toLowerCase() }
            </Option>
          })}
        </SelectWrapper>
      </FormItem>

      {/* {JSON.stringify(getFilters, null, 4)} */}
    </FiltersWrapper>
}

export default compose(
  graphql(GET_FILTERS, { name: 'getFilters' }),
  graphql(UPDATE_FILTER, { name: 'updateFilter' }),
  graphql(GET_HOMELESS_HOUSEHOLDS, {
    name: 'getHomelessHouseholds',
    options: () => ({
      variables: {
        input: {
          limit: 1000,
          offset: 0,
        }
      }
    })
  })
)(FiltersX)
