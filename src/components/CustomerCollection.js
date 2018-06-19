import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Customer from './Customer';

class CustomerCollection extends React.Component {
  static propTypes = {
    baseUrl: PropTypes.string
  }

  constructor (props) {
    super(props);
    this.state = {
      customers: []
    }
  }

  componentDidMount = () => {
    const customerURL = this.props.baseUrl + '/customers'
    axios.get(customerURL)
      .then((response) => {

      })
  }


  render() {
    return (
      <div>
        Hello from customer collection!
        <Customer />
      </div>
    )
  }

}

export default CustomerCollection;
