import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom';
import axios from 'axios';

import Alert from './Status';
import CustomerCollection from './CustomerCollection';
import Library from './Library';
import Movie from './Movie';
import Search from './Search';
import MovieCollection from './MovieCollection';


import './Homepage.css';

const BASE_URL = 'http://localhost:3000/';

class Homepage extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedCustomer: null,
      selectedMovie: null,
      query: null,
      alert: {
        message: null,
        type: null
      }
    }
  }
  checkout = (event) => {
    event.preventDefault();
    const movie = this.state.selectedMovie;
    const customer = this.state.selectedCustomer;

    if (this.state.selectedCustomer && this.state.selectedMovie) {
      const title = movie.title;
      const id = customer.id;

      let dueDate = new Date();
      let day = (dueDate.getDate() + 1);
      dueDate.setDate(day);
      dueDate = dueDate.toDateString();

      this.displayAlert('loading', 'Checking out movie...')

      const URL = (BASE_URL + `rentals/${title}/check-out?customer_id=${id}&due_date=${dueDate}`);

      axios.post(URL)
      .then((response) => {
        //status update responseText
        this.displayAlert('success', `Successfully checked out ${title} for ${customer.name}`)
        this.setState({
          selectedCustomer: null,
          selectedMovie: null,
          query: null
        })
      })
      .catch((error) => {
        console.log(error)
        //status update errorMessages
        this.displayAlert('error', 'Unable to checkout movie');
      })
    }
  }

  search = (query) => {
    this.setState({query: query['query']})
  }

  updateSelectedCustomer = (customerObj) => {
    this.setState({selectedCustomer: customerObj});
  }

  updateSelectedMovie = (movieObj) => {
    if (this.state.selectedMovie === movieObj){
      this.setState({selectedMovie: null});
    } else {
      this.setState({selectedMovie: movieObj});
    }
  }

  clearQuery = () => {
    this.setState({query: null});
    this.clearAlert();
  }

  clearAlert = () => {
    this.setState({
      alert: {
        type: null,
        message: null
      }
    })
  }

  displayAlert = (type, message) => {
    this.setState({
      alert: {
        type: type,
        message: message
      }
    });
  }

  displayMovie() {
    return (
      <section className="selected-movie">
        <h4>Current Movie:</h4>
        <Movie
          movieData={this.state.selectedMovie}
          />
      </section>
    )
  }

  displaySearch () {
    return(
        <MovieCollection
          query={this.state.query}
          url={BASE_URL}
          clearQueryCallback={this.clearQuery}
          displayAlert={this.displayAlert}
          />
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

    let searchResults = null;
    if (this.state.query) {
      searchResults = this.displaySearch();
    }

    let checkoutButton = null;
    if (this.state.selectedMovie && this.state.selectedCustomer) {
      checkoutButton = (<div className="checkout-button" onClick={this.checkout}>
          Checkout
        </div>)
    }
    return (
      <Router>
        <section>
          <header className="App-header">
            <h1 className="App-title">Welcome to OctosVideoStore</h1>
            <div>
              <h4>Current Customer: </h4>
              <span>{selectedCustomer}</span>
              <div>
                {selectedMovie}
              </div>
              {checkoutButton}
            </div>
            <ul>
              <li>
                <Link to='/' onClick={this.clearQuery}>Home</Link>
              </li>
              <li>
                <Link to='/library'>Library</Link>
              </li>
              <li>
                <Link to='/customers'>Customers</Link>
              </li>
              <li>
                <Link to='/search' onClick={this.clearAlert}>Search</Link>
                <Route path='/search'
                  render={() => <Search
                    searchCallback={this.search}
                    />
                }/>
              </li>
            </ul>
          </header>
          <Alert
            type={this.state.alert.type}
            message={this.state.alert.message}
          />
          <main className="main-content">
            <Route exact path='/' />
            <Route
              path='/library'
              render={() => {
                return <Library
                  selectedMovieCallback={this.updateSelectedMovie}
                  baseUrl={BASE_URL}
                  displayAlert={this.displayAlert}
                  />}}
              />
            <Route
              path='/customers'
              render={() => {
                return <CustomerCollection
                  baseUrl={BASE_URL}
                  customerClickCallback={this.updateSelectedCustomer}
                  displayAlert={this.displayAlert}
                  />
              }
            } />
            {searchResults}
          </main>
        </section>


      </Router>
    )
  }

}

export default Homepage;
