import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../client/src/App.jsx';
import mockData from './mockData.js';

describe('App.jsx component', () => {
  let wrapper = mount(<App/>);
  /* If the App mounts successfully, remount before each test */
  beforeEach(() => {
    wrapper.mount();
  })

  test('App should display "Loading..." text before retrieving data', async () => {
    await wrapper.unmount(); //the test should run before the mock data is fetched
    await wrapper.mount();
    expect(wrapper.text()).toContain('Loading...')
  })

  test('App state should be set to retrieved movie data', () => {
   expect(wrapper.state().featuredMovie.title).toBe('The Matrix')
  })

  test('PersonnelCarousel should render once data is retrieved', () => {
    expect(wrapper.find('div.carousel_container').html()).toContain('id="personnel_carousel');
  })

  test('PersonnelCarousel should contain Person components', () => {
    expect(wrapper.find('Person')).toHaveLength(2);
  })

  test('MovieCarousel should not have any children before a click event', () => {
    expect(wrapper.find('MovieCarousel').html()).toBe(null);
  })

  test('Clicking a Person component should call fetch()', async (done) => {
    await wrapper.find('div.headshot').first().simulate('click');
    setTimeout(() => {
      wrapper.update();
      expect(fetch.mock.calls.length).toBe(3);
      done();
    }, 0)
  })

  test('Clicking a Person component should render movies in the MovieCarousel', async (done) => {
    await wrapper.find('div.headshot').first().simulate('click');
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.state().featuredPersonnel[0].title).toBe('The Matrix');
      expect(wrapper.find('MovieCarousel').html()).toContain('The Matrix');
      done();
    }, 0)
  })

})

