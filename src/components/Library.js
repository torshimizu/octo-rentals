import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MovieCollection from './MovieCollection'

export default class Library extends Component {
  render(){
    return(
      <article>
      <h2>Rental Library</h2>
      <MovieCollection
        key="mc-1"
        url={this.props.baseUrl}
        selectedMovieCallback={this.props.selectedMovieCallback}
        displayAlert={this.props.displayAlert}
        />
      </article>
    )
  }

  static propTypes = {
    selectedMovieCallback: PropTypes.func.isRequired,
    baseUrl: PropTypes.string,
    displayAlert: PropTypes.func
  }
}
