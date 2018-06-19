import React from 'react';
import PropTypes from 'prop-types';

class Customer extends React.Component {
  static propTypes = {
    customerData: PropTypes.object,
    onCustomerClick: PropTypes.func.isRequired
  }

  render() {
    const customer = this.props.customerData;

    return (
      <div onClick={this.props.onCustomerClick}>
        <h3>{customer.name}</h3>
        <p>{customer.phone}</p>
      </div>
    )
  }

}

export default Customer;
