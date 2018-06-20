import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Movie from './Movie'
import './MovieCollection.css'

export default class MovieCollection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      searchResults: []
    }
  }

  componentDidMount() {
    let movieURL = this.props.url + '/movies';

    const query = this.props.query;
    if (query) {
      movieURL = (movieURL + '?query=' + query)
      axios.get(movieURL)
      .then((response) => {
        this.setState({searchResults: response.data});
        // add a status component
      })
      .catch((error) => {
        console.log(error);
        // add a status component
      })
    } else {
      axios.get(movieURL)
      .then((response) => {
        this.setState({movies: response.data});
        //add a status component
      })
      .catch((error) => {
        console.log(error);
        //add a status component
      });
    }
  }

  componentDidUpdate(prevProps) {
  if (this.props.query !== prevProps.query) {
      const query = this.props.query;
      let movieURL = this.props.url + '/movies?query=' + query;

      axios.get(movieURL)
      .then((response) => {
        this.setState({searchResults: response.data});
        // add a status component
      })
      .catch((error) => {
        console.log(error);
        // add a status component
      })
    }
  }

  addMovie = (movie) => {
    const postURL = this.props.url + `movies?query=${movie.external_id}`;

    axios.post(postURL)
      .then((response) => {
        console.log(response.data);
        // update status

        this.setState({searchResults: []});
        this.props.clearQueryCallback();

      }).catch((error) => {
        console.log(error);
      });

  }

  getMovies = () => {
    return (
      this.state.movies.map((movie, index) => {
        const onMovieClick = () => {
          this.props.selectedMovieCallback(movie);
        }
        return (
          <li className="movie-list__item " key={index}>
            <Movie
              image_url={movie.image_url}
              movieData={movie}
              onMovieClick={onMovieClick}
              />
          </li>
        )
      })
    );
  }

  getSearchResults = () => {
    // debugger;
    console.log(this.state.searchResults)
    return this.state.searchResults.map((movie, index) => {
      const addMovieCallback = () => {
        this.addMovie(movie);
      }
      return(
        <li className="movie-list__item " key={index}>
          <h2>Search Result # {index}</h2>
          <Movie
            image_url={movie.image_url}
            movieData={movie}
            addMovieCallback={addMovieCallback}
            />
        </li>
      )
    })
  }

  render(){
    let movieCollection = null;
    if (this.state.movies.length !== 0) {
      movieCollection = this.getMovies();
    } else {
      movieCollection = this.getSearchResults();
    }
    return(
      <ul className="movie-list">
        {movieCollection}
      </ul>
    )
  }

  static propTypes = {
    url: PropTypes.string.isRequired,
    query: PropTypes.string,
    selectedMovieCallback: PropTypes.func,
    clearQueryCallback: PropTypes.func
  }
}
