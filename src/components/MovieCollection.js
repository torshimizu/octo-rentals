import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Movie from './Movie'
import './Movie.css'

export default class MovieCollection extends Component {

  addMovie = (movie) => {
    const postURL = this.props.url + `movies?query=${movie.external_id}`;

    axios.post(postURL)
      .then((response) => {
        console.log(response.data);
        // update status
        this.props.displayAlert('success', `Successfully added ${response.data.title}`);
        this.props.clearSearch();

      }).catch((error) => {
        console.log(error.response.data);
        if (error.response.data.errors.includes('external_id')){
          this.props.displayAlert('error', 'This movie was already added to the library');
        } else {
          this.props.displayAlert('error', 'Unable to add movie');
        }
      });

  }

  getMovies = () => {
    return (
      this.props.movies.map((movie, index) => {
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
    return this.props.searchResults.map((movie, index) => {
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
    if (this.props.searchResults) {
      movieCollection = this.getSearchResults();
    } else {
      movieCollection = this.getMovies();
    }
    return(
      <ul className="movie-list">
        {movieCollection}
      </ul>
    )
  }

  static propTypes = {
    movies: PropTypes.array,
    searchResults: PropTypes.array,
    url: PropTypes.string.isRequired,
    query: PropTypes.string,
    selectedMovieCallback: PropTypes.func,
    clearSearch: PropTypes.func,
    displayAlert: PropTypes.func
  }
}
