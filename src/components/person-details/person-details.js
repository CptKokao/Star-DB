import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service'
import Spinner from '../spinner'

import './person-details.css';

export default class PersonDetails extends Component {

  state = {
    person: null
  }

  swapiService = new SwapiService();

  componentDidMount() {
    this.getPerson();
  }

  componentDidUpdate(prevProps) {
    // !!!Важно проверить
    if(this.props.personId !== prevProps.personId) {
      this.setState({
        person: null
      })

      this.getPerson();
    }
  }

  updatePerson = (person) => {
    this.setState({
      person
    })
  }

  getPerson = () => {
    const {personId} = this.props;

    if(!personId) {
      return;
    }

    this.swapiService
      .getPerson(personId)
      .then(this.updatePerson)
  }

  render() {
    if(!this.state.person) {
      return <Spinner/>
    }

    const {id, name, gender, birthYear, eyeColor} = this.state.person;

    return (
      <div className="person-details card">
        <img className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} alt="персонаж"/>

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}