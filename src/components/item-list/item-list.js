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

  rendetItems = (arr) => {
    return arr.map((item) => {

      console.log(item);
      const label = this.props.renderItem(item);

      return (
        <li className="list-group-item"
            key={item.id}
            onClick={() => this.props.onPersonSelected(item.id)}>
          {label}
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