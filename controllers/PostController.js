const Post = require('../models/Post');
const fs = require('fs');
const md5 = require('md5');
const rs = require('randomstring');

const all = async (req, res) => {

    try {
        const posts = await Post.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        });

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

        if (offset > 0) {
            posts = await Post.findAll({
                limit,
                offset
            });
        } else {
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

const destroy = async (req, res) => {
    const id = req.params.id;

    try {
        const toDelete = await Post.findOne({
            where: {
                id
            }
        });

        fs.unlinkSync(`./public/posts/thumbnails/${toDelete.image}`);

        await Post.destroy({
            where: {
                id
            }
        });

        return res.json({
            ok: true,
            message: 'Registro eliminado satisfactoriamente'
        });

    } catch (message) {

        console.error(message);

        return res.status(500).json({
            ok: false,
            message
        })
    }
};

const store = async (req, res) => {

    const body = req.body;
    const thumbnail = req.files.image;

    try {
        const thumbnailsSplit = thumbnail.name.split('.');
        const thumbnailExtension = thumbnailsSplit[1];
        const allowedMimes = ['jpeg', 'jpg', 'png'];

        if (!(allowedMimes.includes(thumbnailExtension))) {
            throw `File extension not allowed, only JPG, JPEG, PNG. Not ${thumbnailExtension}`;
        }

        thumbnail.mv(`./public/posts/thumbnails/${thumbnail.name}`);

        await Post.create({
            image: 'thumbnails/' + thumbnail.name,
            title: body.title,
            description: body.description,
            published_by: req.user
        });

        return res.json({
            ok: true,
            message: 'Artículo creado satisfactoramente'
        });

    } catch (message) {
        return res.status(500).json({
            ok: false,
            message
        })
    }
};

const getById = async (req, res) => {

    const id = req.params.id;

    try {
        const post = await Post.findOne({
            where: {
                id
            }
        });

        return res.json({
            ok: true,
            post
        })
    } catch (message) {
        return res.status(500).json({
            ok: false,
            message
        })
    }
};

const imageContent = async (req, res) => {
    const image = req.files.image;

    try {
        const imageNameSplited = image.name.split('.');
        const thumbnailExtension = imageNameSplited[1];
        const allowedMimes = ['jpeg', 'jpg', 'png'];

        if (!(allowedMimes.includes(thumbnailExtension))) {
            throw `File extension not allowed, only JPG, JPEG, PNG. Not ${thumbnailExtension}`;
        }

        const name = `${imageNameSplited[0]} - ${md5(rs.generate(10))}.${imageNameSplited[1]}`;

        image.mv(`./public/posts/images/${name}`);

        return res.json({
            ok: true,
            file: `/public/posts/images/${name}`
        });
    } catch (message) {
        return res.status(500).json({
            ok: false,
            message
        })
    }
};

const update = async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const files = req.files;

    try {

        if (files !== null) {

            const toTouch = await Post.findOne({
                where: {
                    id
                }
            });

            const image = req.files.image;
            const imageNameSplited = image.name.split('.');
            const thumbnailExtension = imageNameSplited[1];
            const allowedMimes = ['jpeg', 'jpg', 'png'];

            if (!(allowedMimes.includes(thumbnailExtension))) {
                throw `File extension not allowed, only JPG, JPEG, PNG. Not ${thumbnailExtension}`;
            }

            fs.unlinkSync(`./public/posts/thumbnails/${toTouch.image}`);

            const nameImage = `${imageNameSplited[0]} - ${md5(rs.generate(10))}.${imageNameSplited[1]}`;

            image.mv(`./public/posts/thumbnails/${nameImage}`);

            await Post.update({
                title: body.title,
                description: body.description,
                status: body.status,
                image: nameImage
            }, {
                where: {
                    id
                }
            });
        } else {
            await Post.update({
                title: body.title,
                description: body.description,
                status: body.status
            }, {
                where: {
                    id
                }
            });
        }


        return res.json({
            ok: true,
            message: 'Artículo actualizado correctamente'
        });

    } catch (message) {
        console.log(message);
        return res.status(500).json({
            ok: false,
            message
        })
    }
};

module.exports = {
    all, posts, destroy, store, getById, imageContent, update
}
