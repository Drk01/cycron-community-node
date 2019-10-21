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

const posts = async (req, res) => {
    const body = req.body;
    const limit = body.limit || 5;
    const offset = limit * body.offset;

    try {
        let posts = null;

        if(offset > 0){
            posts = await Post.findAll({
                limit,
                offset
            });
        }else{
            posts = await Post.findAll({
                limit
            });
        }

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
    all, posts
}