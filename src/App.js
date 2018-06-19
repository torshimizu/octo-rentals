import React, { Component } from 'react';
import Homepage from './components/Homepage';
import './App.css';
import Library from './components/Library';
import Movie from './components/Movie'

class App extends Component {
  constructor(){
    super();

    this.state = {}
  }

  // removeSelectedMovie = () => {
  //   console.log(this.state);
  //   this.setState=({});
  //   console.log(this.state);
  // }

  selectedMovie = (movie) => {
    let updateState = Object.assign({}, this.state);

    updateState['selectedMovie'] = movie;
    updateState['selectedMovieID'] = movie.id;

    this.setState(updateState);
  }

  displayMovie() {
    console.log(this.state);
    if (this.state.selectedMovie) {
      const movie = this.state.selectedMovie;
      return (
        <section className="selected-movie">
          <Movie
          external_id={movie.external_id}
          id={movie.id}
          image_url={movie.image_url}
          />
        </section>
    )}
    return (<div className="selected-movie">No Selected Movie</div>)
  }

  render() {
    const selectedMovie = this.displayMovie();
    return (
      <div className="App">
        <Homepage />
        <header className="App-header">
          {selectedMovie}
          <h1 className="App-title">Welcome to OctosVideoStore</h1>
        </header>
        <section className="main-content">
          <Library selectedMovieCallback={this.selectedMovie}/>
        </section>
      </div>
    );
  }
}

export default App;
