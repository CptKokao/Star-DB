import React, { Component } from 'react';
import Spinner from '../spinner'
import ErrorButton from '../error-button'

import './item-details.css';

export default class ItemDetails extends Component {

  state = {
    item: null,
    image: null
  }

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
    console.log(this.props);
    
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
    const {name} = item;

    return (
      <div className="item-details card">
        <img className="item-image"
          src={image} alt="персонаж"/>

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, {item})
              })
            }
          </ul>
          <ErrorButton />
        </div>
      </div>
    )
  }
}