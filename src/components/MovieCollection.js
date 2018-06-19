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

    const query = this.props.query
    if (query) {
      movieURL = (movieURL + '?query=' + query)

      console.log(movieURL)

      axios.get(movieURL)
      .then((response) => {
        console.log(response)
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

  addMovie = (movie) => {
    console.log(movie)
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
    this.state.searchResults.map((movie, index) => {
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
    return(
      <ul className="movie-list">
        {this.getMovies()}
        {this.getSearchResults()}
      </ul>
    )
  }

  static propTypes = {
    url: PropTypes.string.isRequired,
    query: PropTypes.string,
    selectedMovieCallback: PropTypes.func
  }
}
