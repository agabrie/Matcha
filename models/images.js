const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema for storing users images
const ImageSchema = new Schema({
    //Image :{                      redundant
        data: Buffer,
        contentType: String,
        // rank: Number
    // }
});

const Image = mongoose.model('image', ImageSchema);

module.exports = Image;