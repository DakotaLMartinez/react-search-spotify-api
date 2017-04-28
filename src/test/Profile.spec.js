import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';


import Profile from '../components/Profile';

describe('Profile', () => {
  it('has prop: artist', () => {
    const artist = {name: 'Bruno Mars', followers: { total: '5314473'}};
    const wrapper = shallow(<Profile artist={artist}/>);
    expect(wrapper.props().artist).to.be.defined;
  });

  it('renders the name of an artist', () => {
    const artist = {name: 'Bruno Mars', followers: { total: '5314473'}};
    const wrapper = shallow(<Profile artist={artist} />);
    expect(wrapper.find('#artist-name').text()).to.equal('Bruno Mars');
    expect(wrapper.find('#artist-follower-count').text()).to.equal('5314473');
  });
});