const mongoose = require('mongoose');
const Image = require('images');
const Interest = require('interests');
const View = require('views');
const Schema = mongoose.Schema;

//Schema for user profile information
const ProfileSchema = new Schema({
    gender: String,
    sexual_preference: [String],
    biography: String,
    images: [Image],
    interests: [Interest],
    views: [View],
    location: {
        type: Point,
        coordinates: [Number]
    },
    date_of_birth: Date
});

const Profile = mongoose.model('profile', ProfileSchema);

module.exports = Profile;