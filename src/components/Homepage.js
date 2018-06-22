import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom';
import axios from 'axios';

import Alert from './Status';
import CustomerCollection from './CustomerCollection';
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
      customers: [],
      movies: [],
      searchResults: [],
      alert: {
        message: null,
        type: null
      }
    }
  }


  getMovies = () => {
  let movieURL = BASE_URL + '/movies';

  axios.get(movieURL)
    .then((response) => {
      this.setState({movies: response.data});
      //add a status component
      this.displayAlert('success', `Loaded ${response.data.length} movies`);
    })
    .catch((error) => {
      console.log(error);
      //add a status component
      this.displayAlert('error', 'Unable to load movies');
    });
  }

  loadCustomers = () => {
    const customerURL = BASE_URL + '/customers';
    axios.get(customerURL)
    .then((response) => {
      this.setState({customers: response.data});
      this.displayAlert('success', `Loaded ${response.data.length} customers`);

    }).catch((error) => {
      console.log(error.response.data);
      this.displayAlert('error', 'Unable to load customers');

    });
  }

  updateCustomers = (movieData) => {
    const customerURL = BASE_URL + '/customers';
    axios.get(customerURL)
    .then((response) => {
      this.setState({customers: response.data});
      this.displayAlert('success', `Successfully checked in ${movieData.title}`);

    }).catch((error) => {
      console.log(error.response.data);
      this.displayAlert('error', 'Unable to load customers');

    });
  }


  checkout = (event) => {
    event.preventDefault();
    const movie = this.state.selectedMovie;
    const customer = this.state.selectedCustomer;

    if (this.state.selectedCustomer && this.state.selectedMovie) {
      const movie_id = movie.id;
      const id = customer.id;

      let dueDate = new Date();
      let day = (dueDate.getDate() + 1);
      dueDate.setDate(day);
      dueDate = dueDate.toDateString();

      this.displayAlert('loading', 'Checking out movie...')

      const URL = (BASE_URL + `rentals/${movie_id}/check-out?customer_id=${id}&due_date=${dueDate}`);

      axios.post(URL)
      .then((response) => {
        console.log(response.data);
        this.displayAlert('success', `Successfully checked out ${movie.title} for ${customer.name}`);
        this.loadCustomers();
        this.setState({
          selectedCustomer: null,
          selectedMovie: null,
          query: null
        });
      })
      .catch((error) => {
        console.log(error)
        this.displayAlert('error', 'Unable to checkout movie');
      })
    }
  }

  checkinCallback = (movieObj, customerObj) => {
    const movie_id = movieObj.id;
    const customer_id = customerObj.id;

    const checkInUrl = BASE_URL + `rentals/${movie_id}/return?customer_id=${customer_id}`;
    axios.post(checkInUrl)
      .then((response) => {
        console.log(response.data);
        this.displayAlert('success', `Successfully checked in ${movieObj.title}`);
        this.updateCustomers(movieObj);
      }).catch((errors) => {
        console.log(errors.response.data);
        this.displayAlert('error', `Unable to check in ${movieObj.title}`);
      });
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

  clearSearchResults = () => {
    this.setState({searchResults: []});
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
          selected={true}
          />
      </section>
    )
  }


  getSearchMovies = (queryObj) => {
    let movieURL = BASE_URL + '/movies';
    const query = queryObj['query'];

    this.displayAlert('loading', `Searching for ${query}`);
    movieURL = (movieURL + '?query=' + query);

    axios.get(movieURL)
    .then((response) => {
      this.setState({searchResults: response.data});
      this.displayAlert('success', `Loaded results for ${query}`);
    })
    .catch((error) => {
      console.log(error);
      this.displayAlert('error', 'Unable to load movies');
    });
  }

  displaySearch() {
    return(
      <MovieCollection
        searchResults={this.state.searchResults}
        query={this.state.query}
        url={BASE_URL}
        clearSearch={this.clearSearchResults}
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
    if (this.state.searchResults) {
      searchResults = this.displaySearch();
    }

    let checkoutButton = null;
    if (this.state.selectedMovie && this.state.selectedCustomer) {
      checkoutButton = (<div className="checkout-button" onClick={this.checkout}>
          Checkout
        </div>);
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
                <Link to='/'
                  onClick={this.clearQuery}>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/library'
                  onClick={this.getMovies}>
                  Library
                </Link>
              </li>
              <li>
                <Link to='/customers' onClick={this.loadCustomers}>Customers</Link>
              </li>
              <li>
                <Link to='/search' onClick={this.clearAlert}>Search</Link>
                <Route path='/search'
                  render={() => <Search
                    searchCallback={this.getSearchMovies}
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
                return (<MovieCollection
                  movies={this.state.movies}
                  url={BASE_URL}
                  selectedMovieCallback={this.updateSelectedMovie}
                  displayAlert={this.displayAlert}
                  />);
                }}
              />
            <Route
              path='/customers'
              render={() => {
                return <CustomerCollection
                  customers={this.state.customers}
                  baseUrl={BASE_URL}
                  customerClickCallback={this.updateSelectedCustomer}
                  displayAlert={this.displayAlert}
                  updateCustomers={this.updateCustomers}
                  checkinCallback={this.checkinCallback}
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
