import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import App from '../components/App';
import beatlesData from './fixtures/beatles.js';
import Profile from '../components/Profile';
// import helper from './helper';

describe('App', () => {
  it('should display Music Master', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.text()).to.match(/Music Master/);
  });

  it('renders tag: #Gallery', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.find('#Gallery')).to.have.length(1);
  });

  it('renders tag: #Profile', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.find('#Profile')).to.have.length(1);
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
    let wrapper, button, search;
    
    beforeEach(() => {
      wrapper = mount(<App/>);
      button  = wrapper.find('button');
      search  = sinon.spy(wrapper.instance(), 'search');
    });

    it('calls the search method upon clicking the search button', () => {
      button.simulate('click');
      expect(search.calledOnce);
    });

    it('calls the search method upon hitting the return key', () => {
      const input = wrapper.find('input');
      input.simulate('keyDown', { key: 'Enter' });
      expect(search.calledOnce);
    })

    it('getApiUrl() finds the correct API endpoint on search', () => {
      wrapper.find('input').simulate('change', { target: { value: 'The Beatles' } });
      const uri = wrapper.instance().getApiUrl();
      expect(uri).to.equal('https://api.spotify.com/v1/search?q=The%20Beatles&type=artist&limit=1');
    });

    describe('API', () => {
      let wrapper;
      
      beforeEach(() => {
        wrapper = mount(<App/>);
        global.fetch = jest.fn().mockImplementation(() => {
          return new Promise((resolve, reject) => {
            resolve({
              'ok': true, 
              'status': 200, 
              json: function() {
                return beatlesData
              }
            });
          });
        });
                
      });

      it('search() makes a request to the spotify API to get artist data', async () => {
        wrapper.setState({query: 'The Beatles'});
        const response = await wrapper.instance().search();
        expect(response.artists.items[0].name).to.equal('The Beatles');
      });

      it('renders Profile component', () => {
        expect(wrapper.find(Profile).length).to.equal(1);
      });
      
    });

    

  });
});