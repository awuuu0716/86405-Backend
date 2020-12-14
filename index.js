const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/products');
const reservesController = require('./controllers/reserves');
const usersController = require('./controllers/users');
const app = express();
const port = process.env.PORT || 4000;
const multer = require('multer');
const upload = multer();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// users
app.post('/signup', usersController.addUser);
app.post('/login', usersController.login);
app.get('/me', usersController.getMe);

// reserve CRUD
app.post('/reserve', reservesController.addReserve);
app.get('/reserve/:date', reservesController.getReserve);
app.get('/reserve/user/:username', reservesController.getUserReserve);
app.delete('/reserve/:id', reservesController.deleteReserve);

// menu CRUD
app.get('/products/:type', productsController.getProducts);
app.post('/products', upload.single('file'), productsController.addProduct);
app.delete('/products/:id', productsController.deleteProduct);
app.put('/products/:id', productsController.updateProduct);
app.put(
  '/products/reupload/:id',
  upload.single('file'),
  productsController.updateProductNewImg
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
