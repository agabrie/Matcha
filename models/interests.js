const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema for the interest tags
const InterestSchema = new Schema({
    // tag: {
        name: String,
        active: Boolean
    // }
});

const Interest = mongoose.model('interest', InterestSchema);

module.exports = Interest;