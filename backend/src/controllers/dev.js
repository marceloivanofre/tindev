const axios = require('axios');
const Dev = require('../models/dev');

module.exports = {
    async index(req, res) {
        const { user } = req.headers;

        const loggedUser = await Dev.findById(user);

        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: loggedUser.likes } },
                { _id: { $nin: loggedUser.dislikes } }
            ]
        });

        return res.json(users);
    },

    async store(req, res) {
        let { username } = req.body;

        username = username.toLowerCase();

        const userExists = await Dev.findOne({ user: username });

        if (userExists)
            return res.status(200).json(userExists);            

        try {
            const response = await axios.get(`https://api.github.com/users/${username}`);
            const { name, bio, avatar_url: avatar } = response.data;

            const dev = await Dev.create({
                name,
                user: username,
                bio,
                avatar
            });

            return res.status(200).json(dev);
        } catch (err) {
            if (err.response.status === 404)
                return res.status(400).json({ error: 'User not found' });

            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};