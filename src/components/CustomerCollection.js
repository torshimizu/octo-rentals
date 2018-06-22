import React from 'react';
import PropTypes from 'prop-types';
import Customer from './Customer';

class CustomerCollection extends React.Component {
  static propTypes = {
    customers: PropTypes.array,
    baseUrl: PropTypes.string,
    customerClickCallback: PropTypes.func.isRequired,
    displayAlert: PropTypes.func,
    updateCustomers: PropTypes.func,
    checkinCallback: PropTypes.func
  }

  getCustomers = () => {
    return (
      this.props.customers.map((customer, index) => {
        const onCustomerClick = () => {
          this.props.customerClickCallback(customer);
        }

        return (
          <Customer
            key={index}
            customerData={customer}
            onCustomerCallback={onCustomerClick}
            checkinClick={this.props.checkinCallback}
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
