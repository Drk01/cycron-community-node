const User = require('../models/User');
const bcrypt = require('bcrypt');

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



module.exports = {
    signUp
};