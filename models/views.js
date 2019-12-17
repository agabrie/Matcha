const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema for users likes, views and matches
const ViewSchema = new Schema({
    user: {
        id: Number,
        liked: Boolean,
        liked_back: Boolean,
        matched: Boolean
    }
});

const View = mongoose.model('view', ViewSchema);

module.exports = View;