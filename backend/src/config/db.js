const mongoose = require('mongoose');
const connection = require('./.env');

mongoose.connect(connection, {
    useNewUrlParser: true
});

module.exports = mongoose;