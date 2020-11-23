import React, { Component } from 'react';
import Spinner from '../spinner';

import './item-list.css';

export default class ItemList extends Component {

  state = {
    peopleList: null
  }

  componentDidMount() {
    this.getPeople();
  }

  // После получения данных, меняет state
  _onLoadedPeople = (peopleList) => {
    this.setState({
      peopleList
    });
  }

  // Получает данные от сервера
  getPeople = () => {
    const {getData} = this.props;

    getData()
      .then(this._onLoadedPeople)
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