import React, {Component} from 'react';
import ErrorIndicator from '../error-indicator';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import SwapiService from '../../services/swapi-service';

import './people-page.css'

export default class PeoplePage extends Component {

  swapiService = new SwapiService()

  state = {
    personId: 2,
    hasError: false
  }

  personSelected = (id) => {
    this.setState({
      personId: id
    })
  }

  componentDidCatch(error, info) {
    console.log(error);
    console.log(info);

    this.setState({
      hasError: true
    })
  }

  render() {
    
    if (this.state.hasError) {
      console.log('test');
      return <ErrorIndicator/>
    }

    return (
      <div className="row mb-2 mt-2">
        <div className="col-md-6">
          <ItemList onPersonSelected = {this.personSelected}
                    getData = {this.swapiService.getAllPeople}
          />
        </div>
        <div className="col-md-6">
          <PersonDetails personId = {this.state.personId}/>
        </div>
      </div>
    );
  }
}