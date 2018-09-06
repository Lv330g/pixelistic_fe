import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FeedLine } from './FeedLine';

enzyme.configure({ adapter: new Adapter() });

describe('FeedLine component', () => {
  const props = {
    nickname: 'Andrew',
    user: {},
    posts: []
  };
  const wrapper = shallow(<FeedLine {...props}/>);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.feed-line')).toHaveLength(1);
  });
});
