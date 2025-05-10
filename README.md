# Express-like Node.js framework with MongoDb functionality

Фреймворк на подобии express-js, написанный на стандартных библиотках Node.js, с примером использования для БД MongoDB

# Фреймворк

Все файлы от фреймворка расположены по одноимённой директории.

Использование: 

1. Создаётся собественный роутер:
    ```javascript
    const router = require('./framework/Router');
    
    const Router = new router();
    
    //описание действий при запросах на указанных путях
    Router.get('/path', (req, res) => res.end('some response') );
    
    Router.request('CUSTOM', '/path', (req, res) => 
        res.end('some response to custom request'))
    ```
2. Создаётся приложение:
    ```javascript
    const application = require('./framework/App');
   const urlParser = require('./framework/parseUrl');
   
   const app = new application();
   
   //подключение мидлвейров (опционально)
   app.use(urlParser);
   
   //подключение роутера
   app.addRouter(Router);
   
   app.listen('8000', () => console.log('server started on port 8000'));
    ```
   
Особенности фреймворка:

1. Возможность добавления нескольких роутеров
2. Миддлвейры:
   1. Уже написаны стандартные методы для удобной работы с данными запросов (телом, отправкой ответов в json-формате, query-параметрами) (рекомендуются к подключению): parseBody, parseJson, parseUrl соответственно
   2. Есть возможность написать свою собственную мидлвару по шаблону: 
   ```javascript
   module.exports = (request, response) => {
       //ваша функция
   }
   ```
3. Есть как методы для стандартных запросов (GET POST DELETE), так и возможность использовать свой собственный запрос (как в примере создания роутера выше)

# Пример работы

Для примера фреймворк будет использован для управления БД на MongoDB через библиотеку Mongoose

Все файлы для запросов к бд находятся в директории `./bd`

В примере по пути /users метод:
1. GET получает пользователей бд, через параметры ссылки можно указать конкретный id искомого пользователя
2. POST добавляет добавляет пользователя вида:
   ```JSON 
   {
       "name":"some name",
       "password":"some password"
   }
   ```
   в бд
3. DELETE удаляет пользователя из бд, id которого был передан в параметре ссылки

# Установка

Клонировать репозиторий, использовать команду `npm install`, создать бд на MongoDB, вставить свою ссылку на бд в нужную строчку в index.js

Для разработки и тестирования можно использовать скрипт `npm run dev`