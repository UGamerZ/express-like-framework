const Router = require('./framework/Router');
const Application = require('./framework/App');
const jsonParser = require('./framework/parseJson');
const parseUrl = require('./framework/parseUrl');
const bodyParser = require('./framework/parseBody');
const mongoose = require('mongoose');
const {getUsers, addUser, removeUser} = require("./bd/bdRequests");

const PORT = process.env.PORT || 8000;

const router = new Router();

router.get('/users' , getUsers);

router.delete('/users', removeUser);

router.post('/users', addUser);

router.get('/', (_, res) => {
    res.end("It's index path");
});

const app = new Application();

app.addRouter(router);

app.use(jsonParser);
app.use(bodyParser);
app.use(parseUrl(`http://localhost:${PORT}`));

const start = async () => {
    try {
        await mongoose.connect('ВАША ССЫЛКА НА MONGODB СЮДА');
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();
