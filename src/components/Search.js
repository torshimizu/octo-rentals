import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    }
  }

  onInputChange = (event) => {

  let updatedInput = Object.assign({}, this.state);

  updatedInput[event.target.name] = event.target.value;

  this.setState(updatedInput);
}

onFormSubmit = (event) => {
    event.preventDefault();

    this.props.searchCallback(this.state)
  }

  render() {
    return(
      <form onSubmit={this.onFormSubmit}>
      <input type="text" name="query" value={this.state.query} onChange={this.onInputChange}/>
      <input type="submit" value="Search"/>
      </form>
    )
  }

  static propTypes = {
    searchCallback: PropTypes.func.isRequired
  }
}
