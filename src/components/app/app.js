import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './app.css';

export default class App extends Component {

  state = {
    personId: 1
  }

  personSelected = (id) => {
    this.setState({
      personId: id
    })
  }

  render() {
    return (
      <div>
        <Header />
        <RandomPlanet />
  
        <div className="row mb2">
          <div className="col-md-6">
            <ItemList onPersonSelected = {this.personSelected}/>
          </div>
          <div className="col-md-6">
            <PersonDetails personId = {this.state.personId}/>
          </div>
        </div>
      </div>
    );
  }
  
}

