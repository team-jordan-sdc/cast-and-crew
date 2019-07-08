import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../client/src/App.jsx';


describe('PersonnelCarousel component', () => {

  test('App.jsx should render without throwing an error', () => {
    const wrapper = render(<App />);
  })

  test('App.jsx should display "Loading..." while fetching data', () => {
    const wrapper = render(<App />);
    expect(wrapper.text()).toContain('Loading...');
  })

  test('Testing', () => {
    const wrapper = mount(<App />);
  })



})

