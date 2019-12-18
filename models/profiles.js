const mongoose = require('mongoose');
const Image = require('./images').schema;
const Interest = require('./interests').schema;
const View = require('./views').schema;
const Schema = mongoose.Schema;

//Schema for user profile information
const ProfileSchema = new Schema({
    gender: String,
    sexual_preference: [String],
    biography: String,
    images:[Image],
    interests: [Interest],
    views: [View],
    location: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            type: [Number],
            index: "2dsphere"
        }
    },
    date_of_birth: Date
});

const Profile = mongoose.model('profile', ProfileSchema);

module.exports = Profile;