const express = require('express');
const router = express.Router();
const connection = require('../db/connection');



router.post('/login', (req, res) => {
  const { email, password } = req.body;

  connection.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password], (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta: ', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      if (results.length > 0) {
        const usuario = {
          id_user: results[0].id_user,
          name: results[0].name,
          last_name: results[0].last_name,
          email: results[0].email,
          photo: results[0].photo
        };

        res.status(200).json(usuario);
      } else {
        res.status(401).json({ error: 'Credenciales incorrectas' });
      }
    }
  });
});
  
router.post('/register', (req, res) => {
  const { name, last_name, email, photo, password } = req.body;

  connection.query('INSERT INTO user (name, last_name, email, photo, password) VALUES (?, ?, ?, ?, ?)', [name, last_name, email, photo, password], (error, result) => {
    if (error) {
      console.error('Error al realizar la consulta: ', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.status(201).json({ message: 'Usuario creado exitosamente' });
    }
  });
});

router.put('/users', (req, res) => {
  const { id_user } = req.query;
  const { name, last_name, email, photo, password } = req.body;
  const updateFields = {}; // Objeto para almacenar los campos a actualizar

  if (name) {
    updateFields.name = name;
  }
  if (last_name) {
    updateFields.last_name = last_name;
  }
  if (email) {
    updateFields.email = email;
  }
  if (photo) {
    updateFields.photo = photo;
  }
  if (password) {
    updateFields.password = password;
  }

  connection.query(
    'UPDATE user SET ? WHERE id_user = ?',
    [updateFields, id_user],
    (error, result) => {
      if (error) {
        console.error('Error al realizar la consulta: ', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        if (result.affectedRows > 0) {
          res.status(200).json({ message: 'Usuario actualizado exitosamente' });
        } else {
          res.status(404).json({ error: 'Usuario no encontrado' });
        }
      }
    }
  );
});

  
module.exports = router; 
