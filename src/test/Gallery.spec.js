import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';


import Gallery from '../components/Gallery';
import beatlesTracks from './fixtures/beatlesTracks';

describe('Gallery', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Gallery tracks={beatlesTracks.tracks}/>)
  });

  it('has many tracks', () => {
    expect(wrapper.find('.track').length).to.equal(10);
  });

  it('has prop: tracks (array)', () => {
    expect(wrapper.props().tracks).to.be.instanceof(Array);
  });

  it('tracks property defaults to an empty array', () => {
    const wrapper = mount(<Gallery/>);
    expect(wrapper.props().tracks).to.eql([]);
  });
  
});