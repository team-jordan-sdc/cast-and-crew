import React from 'react';
import PersonnelCarousel from './components/PersonnelCarousel.jsx';
import MoviesCarousel from './components/MoviesCarousel.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personnel: [],
      featuredMovie: {},
      featuredPersonnel: null,
      selectedPersonnel: null
    };
  }

  componentDidMount() {
    this.getFeaturedMovie('feature=true');
  }

  getFeaturedMovie(querystring) {
    return fetch(`/api/movies?${querystring}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(results => results.json())
      .then(results => this.setState({ featuredMovie: results }))
      .then(() => this.setState({personnel: this.state.featuredMovie.personnel}));
  }

  getPersonnelInfo(id) {
    fetch(`/api/personnel?id=${id._id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(results => results.json())
    .then(results => this.setState({featuredPersonnel: results, selectedPersonnel: id.name}))
  }

  render() {
    return this.state.personnel.length ? (
      <div className="container">
        <PersonnelCarousel personnel={this.state.personnel} movie={this.state.featuredMovie} set={this.getPersonnelInfo.bind(this)}/>
        <MoviesCarousel featuredPersonnel={this.state.featuredPersonnel} selectedPersonnel={this.state.selectedPersonnel}/>
      </div>
    ) : <div>Loading...</div>
  }

}

export default App;
