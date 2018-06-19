import React from 'react';
import CustomerCollection from './CustomerCollection';

const BASE_URL = 'http://localhost:3000/'

class Homepage extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedCustomer: null
    }
  }

  updateSelectedCustomer = (customerObj) => {
    console.log(this.state.selectedCustomer);
    this.setState({selectedCustomer: customerObj});

  }

  render() {
    return (
      <section>
        <CustomerCollection
          baseUrl={BASE_URL}
          customerClickCallback={this.updateSelectedCustomer}
          />
      </section>
    )
  }

}

export default Homepage;
