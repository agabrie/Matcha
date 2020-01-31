const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema for storing users images
const ImageSchema = new Schema({
    image: {
        data: Buffer,
        rank: Number
    } 
});

const Image = mongoose.model('image', ImageSchema);

module.exports = Image;