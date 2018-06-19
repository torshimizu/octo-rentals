import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Movie.css'

export default class Movie extends Component {
  setSelected = (event) => {
    event.preventDefault();
    this.props.selectMovieCallback(this.props.id);
  }

  highlight = () => {
    console.log(this.props.id);
  }

  render() {
    let movie = this.props
    const callback = movie.selectMovieCallback
    let call = this.highlight
    if (callback) {
      call = this.setSelected
    }

    return(
      <a value={movie.id} onClick={call} >
        <img src={`${movie.image_url}`} alt={`${movie.title} poster`}/>
        <section className="movie-details__item">
            <p>Title: {movie.title}</p>
            <p>Overview: {movie.overview}</p>
            <p>Release Date: {movie.release_date}</p>
        </section>
      </a>
    )
  }

  static propTypes = {
    external_id: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    image_url: PropTypes.string.isRequired,
    overview: PropTypes.string,
    release_date: PropTypes.string,
    title: PropTypes.string,
    addMovieCallback: PropTypes.func,
    selectMovieCallback: PropTypes.func
  }
}
