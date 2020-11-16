import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


export default class SwapiService {

  _baseUrl = 'http://swapi.dev/api/';

  getResources = async(url) => {
    const res = await fetch(`${this._baseUrl}${url}`);

    if(!res.ok) {
      throw new Error (`Could not fetch${url} received ${res.status}`)
    }

    const data = res.json();
    return data;
  }

  getPerson = (id) => {
    return this.getResources(`people/${id}`); 
  }

  getAllPeople = async() => {
    const res = await this.getResources(`people/`);
    return res.results;
  }

  getPlanet = (id) => {
    return this.getResources(`planets/${id}`); 
  }

  getAllPlanets = async() => {
    const res = await this.getResources(`planets/`);
    return res.results;
  }

  getStarship = (id) => {
    return this.getResources(`starships/${id}`); 
  }

  getAllStarships = async() => {
    const res = await this.getResources(`starships/`);
    return res.results;
  }
}
const swapi = new SwapiService();

swapi.getStarship(9).then((data) => {
    console.log(data);
  });