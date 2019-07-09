import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../client/src/App.jsx';
import PersonnelCarousel from '../client/src/components/PersonnelCarousel.jsx';
import MoviesCarousel from '../client/src/components/MoviesCarousel.jsx';
import Personnel from '../client/src/components/Person.jsx';
import Movies from '../client/src/components/Movie.jsx';


describe('App.jsx component', () => {
//This should be in its own file, but moving the
//object prevents the json property from being
//called as a function...  I don't know why
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
          "_id": "5d23dde3dd625cbe9b368948",
          "name": "Alan Rickman",
          "thumbnail_url": "https://mapquiz.app/fec/headshots/headshot16.jpeg",
        },
        "role": "Yodelist",
      },
    ],
  });

  global.fetch = () => promise; //TODO: use Jest's native mock functionality.



  test('App should mount without returning an error', () => {
    mount(<App />);
  })

  test('App should display "Loading..." text while retrieving data', () => {
    const wrapper = mount(<App/>);
    expect(wrapper.text()).toContain('Loading...')
  })

  test('App should have its state set to the fetched data one retrieved', () => {
    const wrapper = mount(<App />);
    return promise
      .then(() => wrapper.update())
      .then(() => expect(wrapper.state().featuredMovie.title).toBe('The Matrix'))
  })

  test('App should render a carousel once data is retrieved', (done) => {
    const wrapper = mount(<App />);
    return promise
      .then(() => wrapper.update())
      .then(() => setTimeout(async () => {
        await wrapper.update();
        console.log(wrapper.debug());
        done();
      }, 4000))
      .then(() => console.log(wrapper.debug()))
  })



})

