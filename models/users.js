const mongoose = require('mongoose');
const Profile = require('./profiles').schema;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

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

UserSchema.methods.hashPassword = function(password) {
    return bcrypt.hashSync(password, 12);
};

UserSchema.methods.comparePassword = function(password, hashPassword) {
    return bcrypt.compareSync(password. hashPassword);
};

const User = mongoose.model('user', UserSchema);

module.exports = User;