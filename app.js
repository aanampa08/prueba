/*Puntos a tener en cuenta:
instalar desde cmd: npm init -y
                    npm install express
                    npm install nodemon
                    npm install mysql2 --> solo va a funcionar si tenemos mysql

podemos ejecutar con: npm start --> esta configurado el script
para cerrar la conexion: ctrl + c (2 veces)
IMPORTANTE: el backend debe estar corriendo antes de ejecutar el frontend con el live server
*/ 
const express = require('express');
const cors = require('cors');
const rutasPrueba= require('./rutas/rutasPrueba');
const app = express();

// Usar cors middleware
app.use(cors());
app.use(express.json());
app.use('/prueba',rutasPrueba);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor activo en el puerto: ${PORT}`);
});
