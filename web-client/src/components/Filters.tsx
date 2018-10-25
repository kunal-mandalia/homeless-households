import { Form, Icon, Select, Slider } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

const FormItem = Form.Item;
const { Option } = Select;

interface IProps {
  count: number,
  data: IHomelessHouseholds[],
  filters: IFilters,
  total: number,
  onFilterChange(filterAttribute: FilterAttribute, value: any): void,
}

const FiltersWrapper = styled.div`
  padding: 2em;
`

// @ts-ignore
const SelectWrapper = styled(Select)`
  width: 100%;
`

const SummaryWrapper = styled.div`
  float: right;
`
const Summary = ({ count, total }: { count: number, total: number }) => (
  <SummaryWrapper>
    Showing {count} of {total} records
  </SummaryWrapper>
);

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

export const Filters: React.SFC<IProps> = ({
  count,
  data,
  filters,
  onFilterChange,
  total,
}) => {
  const createFilterUpdateAction = (filterAttribute: FilterAttribute) => (value: any) => {
    onFilterChange(filterAttribute, value);
  }

  const decisions = [...new Set(data.map(record => record.decision))]
    .sort((a,b) => a.localeCompare(b));

  const needs = [...new Set(data.map(record => record.need))]
    .sort((a,b) => a.localeCompare(b));

  const reasons = [...new Set(data.map(record => record.reason))]
    .sort((a,b) => a.localeCompare(b));

  const ethnicities = [...new Set(data.map(record => record.ethnicity))]
    .sort((a,b) => a.localeCompare(b));

  const nationalities = [...new Set(data.map(record => record.nationality))]
    .sort((a,b) => a.localeCompare(b));

  const ages = data.map(record => Math.round(record.age))
  const minAge = Math.min(...ages)
  const maxAge = Math.max(...ages)

  return (
    <FiltersWrapper>
      <h1><Icon type="home" theme="outlined" /> homeless households</h1>
      <br />

      <FormItem
        {...formItemLayout}
        label="Decision"
      >
        <SelectWrapper
          allowClear={true}
          onChange={createFilterUpdateAction('decision')}
        >
          {decisions.map(decision => {
            return <Option key={decision} value={decision}>{
              decision.toLowerCase() }
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
          onChange={createFilterUpdateAction('need')}
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
          onChange={createFilterUpdateAction('reason')}
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
          value={[filters.ageRange[0], filters.ageRange[1]]}
          onChange={createFilterUpdateAction('ageRange')}
        />
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="Ethnicity"
      >
        <SelectWrapper
          allowClear={true}
          onChange={createFilterUpdateAction('ethnicity')}
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
          onChange={createFilterUpdateAction('nationality')}
        >
          {nationalities.map(nationality => {
            return <Option key={nationality} value={nationality}>
              { nationality.toLowerCase() }
            </Option>
          })}
        </SelectWrapper>
      </FormItem>

      <Summary count={count} total={total} />
    </FiltersWrapper>
  )
}
