const JWT = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.get('token');

    if (JWT.verify(token, process.env.JWTKEY)) {
        next();
    } else {
        return res.status(401).json({
            ok: false,
            message: 'Por favor inicie sesión'
        });
    }
};


module.exports = auth;