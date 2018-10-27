import { shallow } from 'enzyme';
import * as React from 'react';
import { Layout } from './Layout';

describe('<Layout .../>', () => {
  it('should render one sidebar', () => {
    // arrange
    const sidebar = <div data-testid='sidebar'>Sidebar</div>
    // act
    const wrapper = shallow(<Layout sidebar={sidebar} tiles={[]} />)
    // assert
    expect(wrapper.find(`[data-testid="sidebar"]`)).toHaveLength(1)
  })

  it('should render many tiles', () => {
    // arrange
    const tiles = [
      <div key='tile-age' data-testid='tile-age'/>,
      <div key='tile-need' data-testid='tile-need'/>,
    ]
    // act
    const wrapper = shallow(<Layout sidebar={<div />} tiles={tiles} />)
    // assert
    expect(wrapper.find(`[data-testid="tile-age"]`)).toHaveLength(1)
    expect(wrapper.find(`[data-testid="tile-need"]`)).toHaveLength(1)
  })

  it('should match snapshot', () => {
    // arrange
    const sidebar = <div data-testid='sidebar'>Sidebar</div>
    const tiles = [
      <div key='tile-age' data-testid='tile-age'/>,
      <div key='tile-need' data-testid='tile-need'/>,
    ]
    // act
    const wrapper = shallow(<Layout sidebar={sidebar} tiles={tiles} />)
    // assert
    expect(wrapper).toMatchSnapshot()
  })
})
