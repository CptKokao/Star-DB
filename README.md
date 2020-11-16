## Раздел 6:Работа с сервером

### 6-1. Создаём пустой проект

        npm i -g create-react-app
        mkdir react-apps
        cd react-apps/
        create-react-app star-db
        cd star-db
        ls
        npm start

### 6-2. Работа Fetch

      fetch()
        .then((resp) => {
          return res.json();
        })
        .then((body) => {
          console.log(body)
        });

      <!-- Аналогично, но более лакнично -->

      const getData = async(url) => {
        const res = await fetch(url);
        const data = res.json();
        return data;
      }

      getData('http://swapi.dev/api/people/1') {
        .then((data) => {
          console.log(data);
        })
      }

### 6-3. Обработка ошибок в Fetch

      const getData = async(url) => {
        const res = await fetch(url);

        if(!res.ok) {
          throw new Error (`Could not fetch${url}` + `received ${res.status}`)
        }

        const data = res.json();
        return data;
      }

      getData('http://swapi.dev/api/people/1') {
        .then((data) => {
          console.log(data);
        })
      }

### 6-4. Создаём класс клиент для API

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