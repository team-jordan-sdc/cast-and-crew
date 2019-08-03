import React from 'react';
import PersonnelCarousel from './components/PersonnelCarousel.jsx';
import MoviesCarousel from './components/MoviesCarousel.jsx';
import { Main } from './styling.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personnel: [],
      featuredMovie: {},
      featuredPersonnel: null, // array of movies
      selectedPersonnel: null // string -- name
    };
  }

  componentDidMount() {
    const qs = new URLSearchParams(window.location.search);
    const res = qs.get('id');
    const search = res || 1;
    this.getFeaturedMovie(search);
  }

  getFeaturedMovie(qs) {
    // respond with exactly the same as original
    // movie obj with a personnel property ==> [] of related personnel obj
    return fetch(`/api/movies?id=${qs}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(results => results.json())
      .then(results => this.setState({ featuredMovie: results }))
      .then(() => this.setState({ personnel: this.state.featuredMovie.personnel }));
  }

  // AKA "set" prop passed down to PersonnelCarousel
  getPersonnelInfo(personnelObj) { // used to be getPersonnelInfo(id) where id was an obj
    // returns an array of movies associated with personnel
    fetch(`/api/personnel?id=${personnelObj.id}`, {
      // used to be fetch(`/api/personnel?id=${id._id}`
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(results => results.json())
    // featuredPersonnel === list of movies associated with personnel
      .then(results => this.setState({ featuredPersonnel: results.movies, selectedPersonnel: personnelObj.name }));
  }

  render() {
    if (!this.state.personnel.length) {
      return <div>Loading...</div>;
    }
    return (
      <Main>
        <PersonnelCarousel personnel={this.state.personnel} movie={this.state.featuredMovie} set={this.getPersonnelInfo.bind(this)} />
        <MoviesCarousel featuredPersonnel={this.state.featuredPersonnel} selectedPersonnel={this.state.selectedPersonnel} />
      </Main>
    );
  }
}

export default App;
