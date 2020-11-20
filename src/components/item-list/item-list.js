import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './item-list.css';

export default class ItemList extends Component {

  state = {
    peopleList: null,
  }

  swapiServer = new SwapiService()

  componentDidMount() {
    this.getPeople();
  }

  // После получения данных, меняет state
  _onLoadedPeople = (peopleList) => {
    this.setState({
      peopleList,
      loading: false
    });
  }

  // Получает данные от сервера
  getPeople = () => {
    this.swapiServer
      .getAllPeople()
      .then(this._onLoadedPeople)
  }

  onClickItem = () => {
    console.log('click');
  }
  
  rendetItems = (items) => {

    return items.map((el) => {
      return (
        <li className="list-group-item"
            key={el.id}
            onClick={() => this.props.onPersonSelected(el.id)}>
          {el.name}
        </li>
      )
    })
  }  

  render() {
    const {peopleList} = this.state;

    if(!peopleList) {
      return <Spinner/>
    }

    return (
      <ul className="item-list list-group">
        {this.rendetItems(peopleList)}
      </ul>
    );
  }
}