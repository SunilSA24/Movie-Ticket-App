const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    language: {
        type: [String],
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    posterPath: {
        type: String,
        required: true,
    },
    rating: {
        type: Number
    }
}, {timestamps:true});

const Movie = mongoose.model('movies', movieSchema);

module.exports = Movie;