import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service'
import Spinner from '../spinner'
import ErrorButton from '../error-button'

import './item-details.css';

export default class ItemDetails extends Component {

  state = {
    item: null,
    image: null
  }

  swapiService = new SwapiService();

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    // !!!Важно проверить
    if(this.props.itemId !== prevProps.itemId) {
      this.setState({
        item: null
      })

      this.updateItem();
    }
  }

  updateItem = () => {
    const {getData, getImageUrl, itemId} = this.props;

    if(!itemId) {
      return;
    }

    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          image: getImageUrl(item)
        })
      })
  }

  render() {
    if(!this.state.item) {
      return <Spinner/>
    }

    const {image, item} = this.state;
    const {name, gender, birthYear, eyeColor} = item;

    return (
      <div className="item-details card">
        <img className="item-image"
          src={image} alt="персонаж"/>

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
          <ErrorButton />
        </div>
      </div>
    )
  }
}