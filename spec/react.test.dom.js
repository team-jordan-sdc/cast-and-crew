import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../client/src/App.jsx';

describe('App.jsx component', () => {

//This should be in its own file, but moving the
//object prevents the json property from being
//called as a function...  I don't know why.
  const promise = Promise.resolve({
    "json": function () { return this }, //mock fetch's response.json() function
    "_id": "5d218036d379e56725e8686b",
    "title": "The Matrix",
    "release_date": "May 12",
    "vudu_rating": 3,
    "rt_rating": 82,
    "price": "$9.99",
    "thumbnail_url": "https://mapquiz.app/fec/thumbnails/movie_thumbnail32.jpeg",
    "personnel": [
      {
        "_id": {
          "_id": "1",
          "name": "Will",
          "thumbnail_url": "https://mapquiz.app/fec/headshots/headshot16.jpeg",
        },
        "role": "Yodelist",
      },
      {
        "_id": {
          "_id": "2",
          "name": "Resen",
          "thumbnail_url": "https://mapquiz.app/fec/headshots/headshot16.jpeg",
        },
        "role": "Lead Guitarist",
      },
    ],
  });

  global.fetch = jest.fn(() => promise);
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









})

