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

const Record = ({item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  )
}

export {
  Record
};

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
      >
        <Record field = 'gender' label = 'Gender'/>
        <Record field = 'eyeColor' label = 'Eye Color'/>
        <Record field = 'birthYear' label = 'Birth Year'/>
      </ItemDetails>
    )

    const starshipDetails = (
      <ItemDetails 
        itemId = {11}
        getData = {getStarship}
        getImageUrl = {getStarshipImage} 
      >
        <Record field = 'model' label = 'Model'/>
        <Record field = 'length' label = 'Length'/>
        <Record field = 'costInCredits' label = 'Cost'/>
      </ItemDetails>

    )
    
    return (
      <ErrorBoundry>
        <Header />
        <RandomPlanet />
        <PeoplePage/>

        <Row 
          left = {personDetails}
          right = {starshipDetails}
        />

      </ErrorBoundry>
    );
  }
  
}

