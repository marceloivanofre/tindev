const mongoose = require('../config/db');
const { Schema, model } = mongoose;

const DevSchema = new Schema({
    name: {
        type: String
    },
    user: {
        type: String,
        required: true
    },
    bio: String,
    avatar: {
        type: String,
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }]
}, {
        timestamps: true
    });

module.exports = model('Dev', DevSchema);