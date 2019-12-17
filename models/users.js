const mongoose = require('mongoose');
const Profile = require('./profiles');
const Schema = mongoose.Schema;

//Schema for registration of users
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name field is required']
    },
    surname: {
        type: String,
        required: [true, 'surname field is required']
    },
    email: {
        type: String,
        required: [true, 'email field is required']
    },
    display_name: {
        type: String,
        required: [true, 'display_name field is required']
    },
    password: {
        type: String,
        required: [true, 'password field is required']
    },
    profile: Profile
});

const User = mongoose.model('user', UserSchema);

module.exports = User;