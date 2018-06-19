import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Movie from './Movie'
import './MovieCollection.css'

export default class MovieCollection extends Component {
  constructor() {
    super();

    this.state = {
      movies: []
    }
  }

  componentDidMount() {
    this.setMovies();
  }

  setMovies() {
    // let BASE_URL = this.props.url;
    // if (this.props.query) {
    //   BASE_URL = BASE_URL + '/movies'
    // }
    const ALL_MOVIES = this.props.url + '/movies'
    axios.get(ALL_MOVIES)
    .then((response) => {
      const movies = response.data;
      this.setState({movies: movies});
      //add a status component

      // console.log(this.state.movies);
    })
    .catch((error) => {
      console.log(error);
      //add a status component
    });
  }

  selectMovie = (id) => {

    const movie = this.state.movies.filter(movie => movie.id === id)[0];
    this.props.selectedMovieCallback(movie);
    // this.setState({selectedMovie: movie});
    // this.setState(updateState);


    // return this.showMovie(id)
    // updateState['movieId'] = ''
  }

  componentDidUpdate(prevState) {
    this.setMovies();
    if (this.state.selectedMovie === []) {
      console.log(`Current State: ${this.state.selectedMovie}`)
      console.log(`Previous State: ${prevState.selectedMovie}`)
    }
  }

  movieCollection() {
    return this.state.movies.map((movie) => {
      return (
        <li className="movie-list__item " key={movie.id}>
          <Movie
            external_id={movie.external_id}
            id={movie.id}
            image_url={movie.image_url}
            overview={movie.overview}
            release_date={movie.release_date}
            title={movie.title}
            selectMovieCallback={this.selectMovie}
            />
        </li>)
      });
    }

    render(){
      const movieCollection = this.movieCollection();
      return(
        <ul className="movie-list">
          {movieCollection}
        </ul>
      )
    }

    static propTypes = {
      url: PropTypes.string.isRequired,
      query: PropTypes.string,
      selectedMovieCallback: PropTypes.func
    }
  }
