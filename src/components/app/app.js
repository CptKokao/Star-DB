import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import SwapiService from '../../services/swapi-service';

import './app.css';

export default class App extends Component {

  swapiService = new SwapiService()


  render() {
    return (
      <div>
        <Header />
        <RandomPlanet />

        <PeoplePage/>

        <div className="row mb-2 mt-2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllPlanets}
              renderItem = {({name, diameter, population}) => `${name} -${diameter} - ${population}`}
            />
          </div>
          <div className="col-md-6">
            <PersonDetails />
          </div>
        </div>

        <div className="row mb-2 mt-2">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllStarships}
              renderItem = {({name, length, passengers}) => `${name} - ${length} - ${passengers}`}
            />
          </div>
          <div className="col-md-6">
            <PersonDetails />
          </div>
        </div>



      </div>
    );
  }
  
}

