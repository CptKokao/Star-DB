import React, {Component} from 'react';
import ErrorIndicator from '../error-indicator';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
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
      return <ErrorIndicator/>
    }

    const itemList = (
      <ItemList onPersonSelected = {this.personSelected}
                getData = {this.swapiService.getAllPeople}
                renderItem = {({name, gender, birthYear}) => `${name} - ${gender} - ${birthYear}`}
      />
    );

    const personDetails = (
      <PersonDetails personId = {this.state.personId}/>
    );

    return (
      <Row left = {itemList} right = {personDetails}/>
    );
  }
}