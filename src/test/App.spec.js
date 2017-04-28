import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import App from '../components/App';

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
      input.simulate('keyDown', { key: 'Enter', keyCode: 69, which: 69 });
      expect(search.calledOnce);
    })


  });
});