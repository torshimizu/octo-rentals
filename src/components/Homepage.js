import React from 'react';
import CustomerCollection from './CustomerCollection';
import Library from './Library';
import Movie from './Movie';

const BASE_URL = 'http://localhost:3000/'

class Homepage extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedCustomer: null,
      selectedMovie: null
    }
  }

  updateSelectedCustomer = (customerObj) => {
    this.setState({selectedCustomer: customerObj});
  }

  selectedMovie = (movie) => {
    let updateState = Object.assign({}, this.state);

    updateState['selectedMovie'] = movie;
    updateState['selectedMovieID'] = movie.id;

    this.setState(updateState);
  }

  displayMovie() {
    if (this.state.selectedMovie) {
      const movie = this.state.selectedMovie;
      return (
        <section className="selected-movie">
          <Movie
          external_id={movie.external_id}
          id={movie.id}
          image_url={movie.image_url}
          />
        </section>
    )}
    return (<div className="selected-movie">No Selected Movie</div>)
  }

  render() {
    let selectedCustomer = null;
    if (this.state.selectedCustomer) {
      selectedCustomer = this.state.selectedCustomer.name;
    }
    const selectedMovie = this.displayMovie();
    console.log(this.state);
    console.log(selectedCustomer);
    return (
      <section>
        <header className="App-header">
          <h1 className="App-title">Welcome to OctosVideoStore</h1>
          <div>
            <h4>Current Customer: </h4>
            <span>{selectedCustomer}</span>
          </div>
        </header>

        <section className="main-content">
          <Library selectedMovieCallback={this.selectedMovie} url={BASE_URL}/>
        </section>

        <CustomerCollection
          baseUrl={BASE_URL}
          customerClickCallback={this.updateSelectedCustomer}
          />
      </section>
    )
  }

}

export default Homepage;
