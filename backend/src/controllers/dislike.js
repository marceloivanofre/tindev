const Dev = require('../models/dev')

module.exports = {
    async store(req, res) {
        const { devId } = req.params;
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if (!targetDev)
            return res.status(400).json({ error: 'Dev not exists' });

        if (loggedDev.dislikes.includes(targetDev._id))
            return res.status(400).json({ error: 'Already disliked' });

        if (loggedDev.likes.includes(targetDev._id))
            return res.status(400).json({ error: 'Already liked' });

        loggedDev.dislikes.push(targetDev._id);

        try {
            await loggedDev.save();
        } catch (err) {
            return res.status(500).json({ error: 'Internal error' })
        }

        return res.status(200).json(loggedDev);
    }
};