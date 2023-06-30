const express = require('express');
const cors = require('cors');
const connection = require('./db/connection');
const bookRouter = require('./routes/book');
const userRouter = require('./routes/user');

const app = express();

connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos: ', error);
  } else {
    console.log('Conexión exitosa a la base de datos.');
  }
});

app.use(cors());
app.use(express.json());

app.use('/books', bookRouter);
app.use('/', userRouter);

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000.');
});
