import React from 'react';
import PropTypes from 'prop-types';
import './Movie.css'

// ****{ Can be returned to class, later if state is needed }****

const Movie = (props) => {
  const movie = props.movieData;
  let button = null;
  if (props.addMovieCallback) {
    button = (<button className="add-movie" onClick={props.addMovieCallback}>Add to Library</button>)
  }
  let movieDetails = null;
  if (props.selected) {
    movieDetails = "selected-movie-details"
  } else {
    movieDetails = "movie-details"
  }
  return(
    <section className={movieDetails} onClick={props.onMovieClick} >
      {button}
      <img src={movie.image_url} alt={`${movie.title} poster`}/>
      <section className="caption">
        <h3>{movie.title}</h3>
        <p>{movie.overview}</p>
        <span>{movie.release_year}</span>
      </section>
    </section>
  )

}

Movie.propTypes = {
  movieData: PropTypes.object,
  addMovieCallback: PropTypes.func,
  onMovieClick: PropTypes.func
}

export default Movie;
