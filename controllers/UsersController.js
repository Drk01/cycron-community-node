const User = require('../models/User');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const transport = require('../services/mail');
const rs = require('randomstring');

const signUp = async (req,res) =>{
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        });

        return res.json({
            status: 'ok',
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

        const exp = Math.floor(Date.now() / 1000) + Number(process.env.JWTEXPIRATION);

        const token = JWT.sign({ exp , data: Usuario.email }, process.env.JWTKEY );

        return res.json({
            status: 'ok',
            token,
            expires_in: process.env.JWTEXPIRATION
        });
        
    } catch (message) {
        
        return res.status(500).json({
            ok:false,
            message
        });
    }

};

const recovery = async (req, res) => {
    const body = req.body;

    try {
        const Usuario = await User.findOne({
            where: {
                email: body.email
            }
        });

        if(!Usuario){
            throw 'Verifique su correo electrónico';
        }

        const reset_token = rs.generate();

        await User.update({ reset_token }, {
            where: {
                id: Usuario.id
            }
        });

        await transport.sendMail({
            from: `${process.env.SMTPSENDER}`,
            to: `${Usuario.email}`,
            subject: 'Solicitud de restauración de contraseña',
            text: `${reset_token}`
        })

        return res.json({
            status: 'ok',
            message: 'Se ha enviado el enlace de restauración a su correo electrónico'
        });           

    } catch (message) {

        return res.status(500).json({
            ok: false,
            message
        });
    }
};

const reset = async (req, res) => {
    body = req.body;
    reset_token = body.reset_token;

    try {

        if (body.password !== body.password_confirmation) {
            throw 'Verifique las contraseñas'
        }

        await User.update({ password: bcrypt.hashSync(body.password, 10) }, { where: { reset_token } });
        await User.update({ reset_token: '' }, { where: { reset_token } });

        return res.json({
            status: 'ok',
            message: 'Su contraseña ha sido reiniciada, por favor inicie sesión'
        })
    } catch (message) {
        
        return res.status(500).json({
            ok: false,
            message
        });
    }

};

const refresh = async (req, res) => {
    const token = req.get('token');

    try {

    const decoded = await JWT.decode(token, { complete: true});

    const exp = Math.floor(Date.now() / 1000) + Number(process.env.JWTEXPIRATION);
    const freshToken = await JWT.sign({ exp, data: decoded.data}, process.env.JWTKEY);

    return res.json({
        status: 'ok',
        freshToken,
        expires_in: process.env.JWTEXPIRATION
    });

    } catch (message) {

        return res.status(500).json({
            ok: false,
            message
        });
    }
};

const me = async (req, res) => {
    const token = req.get('token');

    try {
        
        const decoded = JWT.decode(token);

        const Usuario = await User.findOne({
            where: {
                email: decoded.data
            }
        });

        Usuario['password'] = undefined;

        return res.json(Usuario);

    } catch (message) {
        return res.status(500).json({
            ok: false,
            message
        });
    }
};

const update = async (req, res) => {
    const body = req.body;
    const params = req.params;

    try {
        await User.update(body, {
            where: {
                id: params.id
            }
        });

        return res.json({
            status: 'ok',
            message: 'Usuario actualizado satisfactoriamente'
        });

    } catch (message) {
        return res.status(500).json({
            ok: false,
            message
        });
    }
    
};

const users = async (req, res) => {
    try {
        const users = await User.findAll({});

        return res.json(users);
    }catch (e) {
        return res.status(500).json(e);
    }
};

module.exports = {
    signUp, login, recovery, reset, refresh, me, update, users
};
