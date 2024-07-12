const express = require('express');
const prueba = require('../controller/prueba');
const authMiddleware= require('../middlewares/authMiddleware');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/config');

//Generamos las rutas, y llamamos el desarrollo que va a realizar la peticion
router.post('/registroUsuario',prueba.crearUsuario);
router.post('/loginUsuario',prueba.iniciarUsuario);
router.get('/userinfo', (req, res) => {
    // Obtener el token de la cabecera Authorization
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
    // Si no se proporciona el token
    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado.' });
    }
  
    // Verificar y decodificar el token
    jwt.verify(token, config.secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Token inválido.' });
      }
  
      // Aquí puedes realizar consultas a tu base de datos u obtener información del usuario
      // Por ahora, simplemente devolvemos la información decodificada del token
      const demo = jwt.decode(token);
      console.log(demo); // Aquí debería estar la información del usuario
      // Ejemplo: Actualizar el DOM con el nombre de usuario
      res.json(decoded);
    });
  });
  
module.exports=router;