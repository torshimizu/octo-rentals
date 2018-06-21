import React from 'react';
import PropTypes from 'prop-types';
import './Customer.css';

// alternatively, this can be generated in a fuction in the CustomerCollection
// this customer class can be used to view a specific customer's profile (optional)

const Customer = (props) => {
    const customer = props.customerData;

    let movieList = null;
    if (customer.checked_out_movies.length === 0) {
      movieList = "No rentals at this time";
    } else {
      movieList = (customer.checked_out_movies.map((movie, index) => {
        const checkinClosure = () => {
          props.checkinClick(movie, customer);
        }

        const imageStyles = {
          backgroundImage: `url(${movie.image_url})`,
          backgroundSize: 'cover',
        }

        return (
          <li className="customer-movie__image" key={index} style={imageStyles}>
            <button onClick={checkinClosure}>Checkin Movie</button>
          </li>
        )
      }));
    }
    return (
      <div className="customer" >
        <div className="customer-info__items">
          <h3>{customer.name}</h3>
          <p>{customer.phone}</p>
          <button onClick={props.onCustomerCallback}>Select for Rental</button>
        </div>
        <ul className="customer-movie__list">
          {movieList}
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
