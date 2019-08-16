const Dev = require('../models/dev')

module.exports = {
    async store(req, res) {
        const { devId } = req.params;
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if (!targetDev)
            return res.status(400).json({ error: 'Dev not exists' });

        if (loggedDev.likes.includes(targetDev._id))
            return res.status(400).json({ error: 'Already liked' });

        if (loggedDev.dislikes.includes(targetDev._id))
            return res.status(400).json({ error: 'Already disliked' });

        if (targetDev.likes.includes(loggedDev._id)) {
            const loggedSocket = req.connectedUsers[user];
            const targetSocket = req.connectedUsers[devId];

            if (loggedSocket)
                req.io.to(loggedSocket).emit('match', targetDev);

            if (targetSocket)
                req.io.to(targetSocket).emit('match', loggedDev);
        }

        loggedDev.likes.push(targetDev._id);

        try {
            await loggedDev.save();
        } catch (err) {
            return res.status(500).json({ error: 'Internal error' });
        }


        return res.status(200).json(loggedDev);
    }
};