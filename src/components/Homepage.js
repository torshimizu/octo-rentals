import React from 'react';
import CustomerCollection from './CustomerCollection';

const BASE_URL = 'http://localhost:3000/'

class Homepage extends React.Component {

  render() {
    return (
      <section>
        <CustomerCollection baseUrl={BASE_URL}/>
      </section>
    )
  }

}

export default Homepage;
