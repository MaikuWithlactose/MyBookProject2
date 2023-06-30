const mysql = require('mysql2');

// Código de conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'appbooks'
});

module.exports = connection;
