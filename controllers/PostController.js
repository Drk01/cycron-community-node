const Post = require('../models/Post');

const all = async (req, res) => {
    
    try {
        //TODO: Hacer que los registros salgan ordenados de forma descendente 
        const posts = await Post.findAll({});

        return res.json({
            ok: true, 
            posts
        });

    } catch (message) {
        return res.status(500).json({
            ok: false,
            message
        })
    }

};





module.exports = {
    all
}