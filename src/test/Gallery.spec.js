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

  it('renders tag: .album-art', () => {
    expect(wrapper.find('.album-art')).to.have.length(10);
  });

  it('renders the correct album art', () => {
    expect(wrapper.find('.album-art').first().props().src).to.contain('https://i.scdn.co/image/31327f9fe6b6e0bd6e431a4add681397e95c6329');
  });

  it('displays the name of the song', () => {
    expect(wrapper.find('.track').first().text()).to.include("Here Comes The Sun - Remastered")
  });
  
});