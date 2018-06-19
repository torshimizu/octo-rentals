import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Movie from './Movie'
import './MovieCollection.css'

export default class MovieCollection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: []
    }
  }
  componentDidMount() {
    const movieURL = this.props.url + '/movies';
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

  render(){
    return(
      <ul className="movie-list">
        {this.getMovies()}
      </ul>
    )
  }

  static propTypes = {
    url: PropTypes.string.isRequired,
    query: PropTypes.string,
    selectedMovieCallback: PropTypes.func
  }
}
