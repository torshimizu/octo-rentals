import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MovieCollection from './MovieCollection'

export default class Library extends Component {
  selectMovie = (movie) => {
    this.props.selectedMovieCallback(movie);
  }
  render(){
    return(
      <article>
      <h2>Rental Library</h2>
      <MovieCollection key="mc-1" url="http://localhost:3000/movies" selectedMovieCallback={this.selectMovie} />
      </article>
    )
  }

  static propTypes = {
    selectedMovieCallback: PropTypes.func
  }
}
