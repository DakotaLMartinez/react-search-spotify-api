import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

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
    
  it('clicking the album art for a track calls playTrack(previewUrl)', () => {
    const playTrack = sinon.spy(wrapper.instance(), 'handlePlayClick');
    wrapper.find('.album-art').first().simulate('click');
    expect(playTrack.calledWith('https://p.scdn.co/mp3-preview/6902e7da51d2f17e5369d57dadf8ce7d2a123f99?cid=null')).to.equal(true);
  });

  it('clicking the album art for a track plays the track', () => {
    const audio = new Audio('https://p.scdn.co/mp3-preview/6902e7da51d2f17e5369d57dadf8ce7d2a123f99?cid=null')
    wrapper.find('.album-art').first().simulate('click');
    expect(wrapper.state().playing).to.equal(true);
    expect(wrapper.state().playingUrl).to.equal('https://p.scdn.co/mp3-preview/6902e7da51d2f17e5369d57dadf8ce7d2a123f99?cid=null');
    expect(wrapper.state().audio.src).to.equal(audio.src);
  });

  describe('while a track is playing', () => {
    let audio, clock;

    beforeEach(() => {
      clock = sinon.useFakeTimers();
      audio = new Audio('https://p.scdn.co/mp3-preview/6902e7da51d2f17e5369d57dadf8ce7d2a123f99?cid=null')
      wrapper.find('.album-art').first().simulate('click');
    });

    it('clicking the album art for the playing track pauses playback', () => {
      let pause = sinon.spy(wrapper.state().audio, 'pause');
      wrapper.find('.album-art').first().simulate('click');
      expect(wrapper.state().playing).to.equal(false);
      expect(wrapper.state().playingUrl).to.equal('https://p.scdn.co/mp3-preview/6902e7da51d2f17e5369d57dadf8ce7d2a123f99?cid=null');
      expect(wrapper.state().audio.src).to.equal('https://p.scdn.co/mp3-preview/6902e7da51d2f17e5369d57dadf8ce7d2a123f99?cid=null');
      expect(pause.calledOnce).to.equal(true);
    });

    it('continues playback from previous position after play and pause', () => {
      let audio = wrapper.state().audio;
      audio.currentTime = 4;
      wrapper.setState({currentTime: 4});
      wrapper.find('.album-art').first().simulate('click');
      wrapper.find('.album-art').first().simulate('click');
      expect(wrapper.state().audio.currentTime).to.equal(4);   
    });

    it('clicking the album art for another track shifts playback to the new track', () => {
      let audio = wrapper.state().audio;
      audio.currentTime = 4
      wrapper.find('.album-art').at(1).simulate('click'); 
      expect(wrapper.state().playing).to.equal(true);
      expect(wrapper.state().playingUrl).to.equal('https://p.scdn.co/mp3-preview/83090a4db6899eaca689ae35f69126dbe65d94c9?cid=null');
      expect(wrapper.state().audio.src).to.equal('https://p.scdn.co/mp3-preview/83090a4db6899eaca689ae35f69126dbe65d94c9?cid=null');
      expect(wrapper.state().audio.currentTime).to.equal(0);  
    });

    it('pausing one track and starting another starts the other track at the beginning', () => {
      let audio = wrapper.state().audio;
      audio.currentTime = 4
      wrapper.find('.album-art').first().simulate('click');
      wrapper.find('.album-art').at(1).simulate('click'); 
      expect(wrapper.state().playing).to.equal(true);
      expect(wrapper.state().playingUrl).to.equal('https://p.scdn.co/mp3-preview/83090a4db6899eaca689ae35f69126dbe65d94c9?cid=null');
      expect(wrapper.state().audio.src).to.equal('https://p.scdn.co/mp3-preview/83090a4db6899eaca689ae35f69126dbe65d94c9?cid=null');
      expect(wrapper.state().audio.currentTime).to.equal(0);  
    });

    it('clicking the album art for another track pauses playback on the previous track', () => {
      let audio = wrapper.state().audio;
      let pause = sinon.spy(audio, 'pause');
      wrapper.find('.album-art').at(1).simulate('click'); 
      expect(pause.calledOnce).to.equal(true);
    });

    it('clicking the album art for the same track after it has completed starts playback at beginning', () => {
      let audio = wrapper.state().audio;
      audio.currentTime = 33;
      clock.tick(33000);
      wrapper.find('.album-art').first().simulate('click');
      expect(wrapper.state().audio.currentTime).to.equal(0);
    });

    
  });
  
});