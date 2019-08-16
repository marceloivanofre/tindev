const express = require('express');
const dev = require('./controllers/dev');
const like = require('./controllers/like');
const dislike = require('./controllers/dislike');

const routes = express.Router();

routes.get('/devs', dev.index);
routes.post('/devs', dev.store);

routes.post('/devs/:devId/likes', like.store);
routes.post('/devs/:devId/dislikes', dislike.store);

module.exports = routes;