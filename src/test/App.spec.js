import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import App from '../components/App';

describe('App', () => {
  it('should display Music Master', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.text()).to.match(/Music Master/);
  });

  it('renders tag: .Gallery div', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.find('.Gallery')).to.have.length(1);
  });

  it('renders tag: .Profile', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.find('.Profile')).to.have.length(1);
  });
});