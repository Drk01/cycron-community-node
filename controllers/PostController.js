const Post = require('../models/Post');
const fs = require('fs');
const md5 = require('md5');
const rs = require('randomstring');
const base64Str = require('base64-to-image');

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
    const reqPage = req.query.page;

    try {
        const posts = await Post.paginate({
            page: reqPage,
            paginate: 10,
            order: [['id', 'DESC']]
        });
        return res.json(posts);

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

        await fs.unlinkSync(`./public${toDelete.image}`);

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
         thumbnail.mv(`./public/posts/thumbnails/${thumbnail.name}`);

        const postCreado = await Post.create({
            image: `/posts/thumbnails/${thumbnail.name}`,
            title: body.title,
            description: body.description,
            published_by: req.user
        });

        return res.status(201).json(postCreado);

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

    let image64 = req.body.image;


    /*    let image = req.files.image;

        const pos = image.indexOf(";");
        const type = image.split(image.substring(0, pos))[1];

        image = image.replace(`data:${type};base64,` ,'');
        image = image.replace(' ', '+');

        image = Base64.atob(image);*/

    try {
        const image = base64Str(image64, './public/posts/images/', {
            filename: `${md5(rs.generate(10))}-asdfsaf`,
        });

        return res.json({
            default: `http://${req.headers.host}/v1/posts/images/${image.fileName}`
        });

        /*const imageNameSplited = image.name.split('.');
        const thumbnailExtension = imageNameSplited[1];
        const allowedMimes = ['jpeg', 'jpg', 'png'];

        if (!(allowedMimes.includes(thumbnailExtension))) {
            throw `File extension not allowed, only JPG, JPEG, PNG. Not ${thumbnailExtension}`;
        }

        const name = `${imageNameSplited[0]} - ${md5(rs.generate(10))}.${imageNameSplited[1]}`;

        await image.mv(`./public/posts/images/${name}`);

        return res.json({
            default: `/posts/images/${name}`
        });*/

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
