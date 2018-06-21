import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Customer from './Customer';

class CustomerCollection extends React.Component {
  static propTypes = {
    baseUrl: PropTypes.string,
    customerClickCallback: PropTypes.func.isRequired,
    displayAlert: PropTypes.func
  }

  constructor (props) {
    super(props);
    this.state = {
      customers: []
    }
  }

  componentDidMount = () => {
    this.loadCustomers();
  }

  loadCustomers = () => {
    const customerURL = this.props.baseUrl + '/customers'
    axios.get(customerURL)
    .then((response) => {
      this.setState({customers: response.data});
      this.props.displayAlert('success', `Loaded ${response.data.length} customers`);

    }).catch((errors) => {
      console.log(errors);
      this.props.displayAlert('error', 'Unable to load customers');

    });
  }

  checkinCallback= (movieObj, customerObj) => {
    const movie_id = movieObj.id;
    const customer_id = customerObj.id;

    const checkInUrl = this.props.baseUrl + `rentals/${movie_id}/return?customer_id=${customer_id}`

    axios.post(checkInUrl)
      .then((response) => {
        console.log(response.body);
        this.props.displayAlert('success', `Successfully checked in ${movieObj.title}`);
        // how to update the customer?
      }).catch((errors) => {
        console.log(errors.messages);
        this.props.displayAlert('error', `Unable to check in ${movieObj.title}`);
      });
    console.log('after the checkinCallback');
    this.forceUpdate();
  }

  getCustomers = () => {
    return (
      this.state.customers.map((customer, index) => {
        const onCustomerClick = () => {
          this.props.customerClickCallback(customer);
        }

        return (
          <Customer
            key={index}
            customerData={customer}
            onCustomerCallback={onCustomerClick}
            checkinClick={this.checkinCallback}
          />
        )
      })
    );
  }


  render() {
    return (
      <div className="customer-collection">
        <h2>List of Customers:</h2>
        {this.getCustomers()}
      </div>
    )
  }

}

export default CustomerCollection;
