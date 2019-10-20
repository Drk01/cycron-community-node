const User = require('../models/User');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const signUp = async (req,res) =>{
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        });

        return res.json({
            ok: true,
            message: 'Usuario registrado satisfactoriamente'
        });

    } catch (message) {
        return res.status(500).json({
            ok: false,
            message
        });
    }
};

const login = async (req, res) => {
    let body = req.body;

    try {

        const Usuario = await User.findOne({
            where: {
                email: body.email
            }
        });

        if(!Usuario){
            throw 'Correo electrónico o contraseña incorrectas';  
        }

        if(!bcrypt.compareSync(body.password, Usuario.password)){
            throw 'Correo electrónico o contraseña incorrectas';    
        }

        const exp = Number(process.env.JWTEXPIRATION);

        const token = JWT.sign({ exp , data: Usuario.email }, process.env.JWTKEY );

        return res.json({
            ok: true,
            token,
            expires_in: process.env.JWTEXPIRATION
        });
        
    } catch (message) {

        console.error(message);
        
        return res.status(500).json({
            ok:false,
            message
        });
    }

};



module.exports = {
    signUp, login
};