const db = require('../db/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config')

const crearUsuario = (req, res) => {
    const { usuario, contraseña } = req.body;

    //cifrar la contraseña usando bcrypt
    const hashcontraseña = bcrypt.hashSync(contraseña, 8);
    const sql = 'INSERT INTO usuario(nombre,contraseña)VALUES(?,?)';
    db.query(sql, [usuario, hashcontraseña], (err, result) => {
        if (err) throw err;
        //genera un token para el nuevo usuario
        const token = jwt.sign({ id: result.insertId}, config.secretKey, { expiresIn: config.tokenExpiresIn });
        console.log(result.insertId);
        // res.json({message:'Usuario creado.'});
        console.log("Usuario creado");
        res.status(201).send({ auth: true, token });
    });

}

const iniciarUsuario = (req, res) => {
    const { usuario, contraseña } = req.body;
    const sql = 'SELECT * from usuario where nombre=?';
    db.query(sql, [usuario, contraseña], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const esValidacontraseña = bcrypt.compareSync(contraseña, results[0].contraseña);
            if (!esValidacontraseña) return res.status(401).send({ auth: false, token: null });

            const token = jwt.sign({ id: results[0].id,username: results[0].nombre}, config.secretKey, { expiresIn: config.tokenExpiresIn });
            res.status(200).send({ auth: true, token });

        }
        else {
            res.json({ estado: false });
        }
    })
};


module.exports = {
    crearUsuario
    , iniciarUsuario
};