const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create movie Schema & model
const MovieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title field is required']
    },
    genre: {
        type: String,
        required: [true, 'Genre field is required']
    },
    yearOfRelease: {
        type: Number
    }
});

//specify the actual name of the collection to be created ('movie')
const Movie = mongoose.model('movie', MovieSchema);

module.exports = Movie;