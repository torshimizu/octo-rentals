import React from 'react';
import PropTypes from 'prop-types';
import './Customer.css';

// alternatively, this can be generated in a fuction in the CustomerCollection
// this customer class can be used to view a specific customer's profile (optional)

const Customer = (props) => {
    const customer = props.customerData;
// <img src={movie.image_url} alt={movie.title} />
    return (
      <div className="customer" >
        <div>
          <h3>{customer.name}</h3>
          <p>{customer.phone}</p>
          <button onClick={props.onCustomerCallback}>Select for Rental</button>
        </div>
        <ul className="customer-movie__list">
          {customer.checked_out_movies.map((movie, index) => {
            const checkinClosure = () => {
              props.checkinClick(movie, customer)
            }

            const imageStyles = {
              backgroundImage: `url(${movie.image_url})`,
              backgroundSize: 'contain',
            }

            return (
              <li className="customer-movie__image" key={index} style={imageStyles}>
                <button onClick={checkinClosure}>Checkin Movie</button>
              </li>
            )
          })}
        </ul>
      </div>
    );
}

Customer.propTypes = {
  customerData: PropTypes.object,
  onCustomerCallback: PropTypes.func.isRequired,
  checkinClick: PropTypes.func
}

export default Customer;
