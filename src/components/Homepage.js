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

  updateSelectedMovie = (movieObj) => {
    this.setState({selectedMovie: movieObj});
  }

  displayMovie() {
      return (
        <section className="selected-movie">
          <Movie
            movieData={this.state.selectedMovie}
            />
        </section>
      )
    }

    render() {
      let selectedCustomer = null;
      if (this.state.selectedCustomer) {
        selectedCustomer = this.state.selectedCustomer.name;
      }
      let selectedMovie = null;
      if (this.state.selectedMovie) {
        selectedMovie = this.displayMovie();
      }
      console.log(this.state);
      console.log(selectedCustomer);
      return (
        <section>
          <header className="App-header">
            <h1 className="App-title">Welcome to OctosVideoStore</h1>
            <div>
              <h4>Current Customer: </h4>
              <span>{selectedCustomer}</span>
              <div>
                <h4>Current Movie:</h4>
                {selectedMovie}
              </div>
            </div>
          </header>

          <section className="main-content">
            <Library customerClickCallback={this.updateSelectedMovie} baseUrl={BASE_URL}/>
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
