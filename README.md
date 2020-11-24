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

### 6-11. Работа с API - выводы

1. React ничего не знает о работе с сервером - это задача других библиотек
2. Сетевой код стоит изолировать от кода компонентов
3. Если необходимо трансформируйте данные для того, как их получит компонент
4. Обрабатывайте состояние "загрузка" и "ошибка"
5. Разделяйте ответственность компонентов: Логику и Рендеринг
                
## Раздел 7:Жизненный цикл компонентов

### 7-2. Методы жизненного цикла

> MOUNTING

constructor() => render() => **componentDidMount()**

> UPDATES

New Props или satState() => render() => **componentDidUpdate()**

> UNMOUNTING

**componentWillUnmount()**

> ERROR

**componenDidCatch()**

- Отлавливает ошибки, которые произошли в методах жизненного цикла ниже по иерархии
- принцип похож на try/catch - ошибки отлавливает ближний блок
- НЕ обрабатываются ошибки в event listener'ах и в асинхронном коде(запросы к серверу и т.п.)

## Раздел 8:Паттерны React

### 8-3. Render-функции

- Паттерн React - в компонент передается функция, которая рендерит часть компонента (или весь компонент)

```javascript  
    <CardComponent renderBody = {() => <p>Hello</p>}/>
```

### 8-4. Свойства-элементы

- В качестве значения свойства можно передавать React элемент. Так можно создавать элементы-"контейнеры"

```javascript  
    <CardComponent title={<h1>Hi</h1>}/>
```

### 8-5. Children

- Компоненту можно передавать одно из свойтсв, поместив его в тело элемента.
- Это свойство доступно через this.props.children.
- Поддерживает любые типы данныхЖ элементы, функции, объекты и др.

```javascript  
    <ErrorBoundry>
      <Row left = {itemList} right = {personDetails}/>
    </ErrorBoundry>
```
