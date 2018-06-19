import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom';

import CustomerCollection from './CustomerCollection';
import Library from './Library';
import Movie from './Movie';
import './Homepage.css'

const BASE_URL = 'http://localhost:3000/';

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

  // displayLibrary = () => {
  //   return (
  //     <section className="main-content">
  //       <Library customerClickCallback={this.updateSelectedMovie} baseUrl={BASE_URL}/>
  //     </section>
  //   )
  // }
  //
  // Customers = () => {
  //   return (
  //     <CustomerCollection
  //       baseUrl={BASE_URL}
  //       customerClickCallback={this.updateSelectedCustomer}
  //       />
  //   )
  // }

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
    return (
      <Router>
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
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/library'>Library</Link>
              </li>
              <li>
                <Link to='/customers'>Customers</Link>
              </li>
            </ul>
          </header>
          <main>
            <Route exact path='/' />
            <Route
              path='/library'
              render={() => <Library customerClickCallback={this.updateSelectedMovie} baseUrl={BASE_URL}/>}
              />
            <Route
              path='/customers'
              render={() => {
                return <CustomerCollection
                  baseUrl={BASE_URL}
                  customerClickCallback={this.updateSelectedCustomer}
                />
              }
            } />
          </main>
        </section>


      </Router>
    )
  }

}

export default Homepage;
