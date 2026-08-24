const express = require('express');
const Movie = require('../models/movie.model.js');

const movieRouter = express.Router();

// New movie creation
movieRouter.post('/add-movie', async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.status(200).send({
            success: true,
            message: 'New movie has been added'
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Movie could not be added'
        });
    }
});

// update movie
movieRouter.put('/update-movie', async(req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.body._id, req.body);

        res.status(200).send({
            success: true,
            message: "Movie updated suceessfully",
            data: updatedMovie
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message:'movie could not be updated'
        });
    }
    
});

// Delete movie
movieRouter.delete('/delete-movie', async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.body._id, req.body);

        res.status(200).send({
            success: true,
            message: 'Movie deleted successfully',
            data: deletedMovie
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Movie could not deleted',
            error: error
        });
    }
});

// get all movies
movieRouter.get('/all-movies', async(req,res) => {
    try {
        const allMovies = await Movie.find();
        res.status(200).send({
            success: true,
            data: allMovies
        });
    } catch (error) {
        res.status(500).send(error);
    }
    
});

//specific movie
movieRouter.get('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const specificMovie = await Movie.findById(id);
        res.status(200).send({
            success: true,
            data: specificMovie
        })
    } catch (error) {
        res.status(400).send('not found');
    }
});

module.exports = movieRouter;