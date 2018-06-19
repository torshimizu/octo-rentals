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
    this.setState({selectedCustomer: customerObj});
  }

  render() {
    let selectedCustomer = null;
    if (this.state.selectedCustomer) {
      selectedCustomer = this.state.selectedCustomer.name;
    }

    return (
      <section>
        <aside>
          <h4>Current Customer: </h4>
          <span>{selectedCustomer}</span>
        </aside>
        <CustomerCollection
          baseUrl={BASE_URL}
          customerClickCallback={this.updateSelectedCustomer}
          />
      </section>
    )
  }

}

export default Homepage;
