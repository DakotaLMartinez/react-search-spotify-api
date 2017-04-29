import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import Profile from '../components/Profile';
import beatlesData from './fixtures/beatles.js';
//import helper from './helper';

describe('Profile', () => {
  let artist, wrapper;
  beforeEach(() => {
    artist  = beatlesData.artists.items[0];
    wrapper = shallow(<Profile artist={artist}/>);
  });

  it('has prop: artist', () => {
    expect(wrapper.props().artist).to.be.defined;
  });

  it('renders the profile picture of an artist', () => {
    expect(wrapper.find('#profile-img').props().src).to.equal(artist.images[0].url)
  });

  it('renders the name of an artist', () => {
    expect(wrapper.find('#artist-name').text()).to.equal('The Beatles');
  });

  it('renders the follower count of an artist', () => {
    expect(wrapper.find('#artist-follower-count').text()).to.equal('3170961');
  });

  it('renders the genres of an artist', () => {
    const genres = wrapper.find('#artist-genres')
    artist.genres.forEach((genre) =>{
      expect(genres.text()).to.match(new RegExp(genre));
    })
  });


});