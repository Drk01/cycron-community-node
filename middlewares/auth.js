const JWT = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    const token = req.get('token');

    if (JWT.verify(token, process.env.JWTKEY)) {

        const decoded = JWT.decode(token);
        const usuario = await User.findOne({
            where: {
                email: decoded.data
            }
        })

        req.user = usuario.id;

        next();
    } else {
        return res.status(401).json({
            ok: false,
            message: 'Por favor inicie sesión'
        });
    }
};


module.exports = auth;