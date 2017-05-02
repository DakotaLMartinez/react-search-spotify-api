import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import App from '../components/App';
import Profile from '../components/Profile';
import Gallery from '../components/Gallery';
import Spotify from '../lib/spotify';

import beatlesData from './fixtures/beatles.js';
//import helper from './helpers/helper';
import mockFetch from './helpers/mockFetch';
import mockResponse from './helpers/mockResponses';

describe('App', () => {
  afterAll(() => {
    mockFetch.restore();
  });
  it('should display Music Master', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.text()).to.match(/Music Master/);
  });

  it('renders tag: #Profile', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.find('#Profile')).to.have.length(1);
  });

  it('renders Profile component', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.find(Profile).length).to.equal(1);
  });

  it('renders Gallery component', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.find(Gallery)).to.have.length(1);
  });
  
  it('has state: query, with initial value: ""', () => {
    const wrapper = mount(<App/>);
    expect(wrapper.state().query).to.equal("");
  });

  it('has state: artist, with initial value: null', () => {
    const wrapper = mount(<App/>);
    expect(wrapper.state().artist).to.equal(null);
  });

  describe('behavior', () => {
    let wrapper, search;
    
    beforeEach(() => {
      wrapper = mount(<App/>);
    });

    it('clicking the search button calls the search() function on Spotify API', () => {
      search = sinon.spy(Spotify, 'search');

      wrapper.find('form').simulate('submit');
      sinon.assert.calledOnce(search);

      search.restore();
    });

    describe('API interaction', () => {
      let beatles;
      
      beforeEach(() => {
        mockResponse.beatlesSearch()
        wrapper.setState({query: 'The Beatles'});
        beatles = beatlesData.artists.items[0];       
      });

      it('search() gets artist data from the spotify API', async () => {
        const response = await wrapper.instance().search();
        expect(response.artists.items[0]).to.equal(beatles);
      });

      it('search() calls the updateProfile() function', async () => {
        const updateProfile = sinon.spy(wrapper.instance(), 'updateProfile');
        await wrapper.instance().search();
        expect(updateProfile.calledOnce).to.equal(true);
      });

      it('search() calls the loadTracks() function', async () => {
        const loadTracks = sinon.spy(wrapper.instance(), 'loadTracks');
        await wrapper.instance().search();
        expect(loadTracks.calledOnce).to.equal(true);
      });

      it('searching for an artist renders the profile for that Artist', async () => {
        await wrapper.instance().search();
        expect(wrapper.find(Profile).props().artist).to.equal(beatles);
      });
      
    });

    describe('Error handling', () => {
        
      beforeEach(() => {
        mockResponse.emptySearch();     
      });
    
      it('displays an error message on empty search', async () => {
        const response = await wrapper.instance().search()
        expect(wrapper.find('.error').text()).to.equal('Please enter a search query');
      });

      it('clears the error when a successful search is completed', async () => {
        await wrapper.instance().search();
        mockResponse.beatlesSearch();
        await wrapper.instance().search();
        expect(wrapper.find('.error').text()).to.equal('');
      });

      it('displays an artist not found message upon unsuccessful search', async() => {
        mockResponse.artistNotFound();
        await wrapper.instance().search();
        expect(wrapper.find('.error').text()).to.equal('Artist not found, please try again');
      });

      it('clears artist not found message upon successful search', async() => {
        mockResponse.artistNotFound();
        await wrapper.instance().search();
        mockResponse.beatlesSearch();
        await wrapper.instance().search();
        expect(wrapper.find('.error').text()).to.equal('');
      });
      
    });
    

  });
});