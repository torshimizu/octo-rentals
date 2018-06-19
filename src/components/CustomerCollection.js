import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Customer from './Customer';

class CustomerCollection extends React.Component {
  static propTypes = {
    baseUrl: PropTypes.string,
    customerClickCallback: PropTypes.func.isRequired
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

        this.setState({customers: response.data});

      }).catch((errors) => {
        console.log(errors);
      });
  }

  getCustomers = () => {
    return (
      this.state.customers.map((customer, index) => {
        const onCustomerClick = () => {
          console.log('this happened');
          this.props.customerClickCallback(customer);
        }

        return (
          <Customer
            key={index}
            customerData={customer}
            onCustomerClick={onCustomerClick}
          />
        )
      })
    );
  }


  render() {
    return (
      <div>
        <h2>List of Customers:</h2>
        {this.getCustomers()}
      </div>
    )
  }

}

export default CustomerCollection;
