import React from 'react';
import PropTypes from 'prop-types';

// alternatively, this can be generated in a method in the CustomerCollection
// this customer class can be used to view a specific customer's profile (optional)

const Customer = (props) => {
    const customer = props.customerData;

    return (
      <div onClick={props.onCustomerClick}>
        <h3>{customer.name}</h3>
        <p>{customer.phone}</p>
      </div>
    );
}

Customer.propTypes = {
  customerData: PropTypes.object,
  onCustomerClick: PropTypes.func.isRequired
}



// class Customer extends React.Component {
//
//   render() {
//     const customer = this.props.customerData;
//
//     return (
//       <div onClick={this.props.onCustomerClick}>
//         <h3>{customer.name}</h3>
//         <p>{customer.phone}</p>
//       </div>
//     )
//   }
//
// }

export default Customer;
