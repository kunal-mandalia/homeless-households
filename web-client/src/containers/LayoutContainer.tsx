import * as React from 'react';

interface IProps {
  data: IQueryHomelessHouseholds
}

export class LayourContainer extends React.Component<IProps> {
  public render() {
    const { data: { getHomelessHouseholds } } = this.props;
  
    return (
      <div>
        <div>data: {JSON.stringify(getHomelessHouseholds, null, 4)}</div>
      </div>
    )
  }
}