import React, {Component} from 'react';
import ErrorIndicator from '../error-indicator';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';

import './people-page.css'

const Row = ({left, right}) => {
  return (
    <div className="row mb-2 mt-2">
      <div className="col-md-6">
        {left}
      </div>
      <div className="col-md-6">
        {right}
      </div>
    </div>
  );
}

export default class PeoplePage extends Component {

  swapiService = new SwapiService()

  state = {
    personId: 1,
  }

  personSelected = (id) => {
    this.setState({
      personId: id
    })
  }


  render() {
    
    if (this.state.hasError) {
      return <ErrorIndicator/>
    }

    const itemList = (
      <ItemList onPersonSelected = {this.personSelected}
                getData = {this.swapiService.getAllPeople}>
        {(item) => `${item.name} - ${item.birthYear}`}
      </ItemList>
      
    );

    const personDetails = (
      <ErrorBoundry>
        <PersonDetails personId = {this.state.personId}/>
      </ErrorBoundry>
    );

    return (
      <ErrorBoundry>
        <Row left = {itemList} right = {personDetails}/>
      </ErrorBoundry>
    );
  }
}