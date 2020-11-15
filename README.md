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
