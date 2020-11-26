import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import ItemList from '../item-list';
import ItemDetails from '../item-details';
import ErrorBoundry from '../error-boundry'
import Row from '../row'
import SwapiService from '../../services/swapi-service';

import './app.css';

export default class App extends Component {

  swapiService = new SwapiService()
  
  render() {

    const {getPerson, 
           getStarship, 
           getPersonImage, 
           getStarshipImage } = this.swapiService

    const personDetails = (
      <ItemDetails 
        itemId = {5}
        getData = {getPerson} 
        getImageUrl = {getPersonImage} 
      />
    )

    const starshipDetails = (
      <ItemDetails 
        itemId = {11}
        getData = {getStarship}
        getImageUrl = {getStarshipImage} 
      />
    )
    
    return (
      <ErrorBoundry>
        <Header />
        {/* <RandomPlanet />
        <PeoplePage/> */}

        <Row 
          left = {personDetails}
          right = {starshipDetails}
        />

      </ErrorBoundry>
    );
  }
  
}

