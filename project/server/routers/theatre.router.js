const express = require('express');
const Theatre = require('../models/theatre.model.js');

const theatreRoute = express.Router();

// add new theatre
theatreRoute.post('/add-theatre', async(req, res) => {
    try {
        const newTheatre = new Theatre(req.body);
        await newTheatre.save();
        res.status(200).send({
            success: true,
            message: 'New theatre has been added'
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Theatre could not be added'
        })
    }
});

theatreRoute.post('/get-all-theatre-owner', async(req, res) => {
    try {
        const theatres = await Theatre.find({ owner: req.body.owner_id });
        res.status(200).send({
            success: true,
            theatres
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message: "Could not find theatres related to this owner"
        })
    }
});

// get all theatre
theatreRoute.get('/all-theatre', async(req,res) => {
    try {
        const allTheatre = await Theatre.find();
        res.status(200).send({
            success: true,
            data: allTheatre
        })
    } catch (error) {
        res.status(500).send(error);
    }
});

// update theater
theatreRoute.put('/update-theatre', async(req, res) => {
    try {
        const updatedTheatre = await Theatre.findByIdAndUpdate(req.body._id, req.body);
        res.status(200).send({
            success: true,
            message: 'The theatre updated successfully',
            data: updatedTheatre
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'The theater could not be updated',
        });
    }
});

// delete the theatre
theatreRoute.delete('/delete-theatre', async(req, res) => {
    try {
        const deleteTheatre = await Theatre.findByIdAndDelete(req.body._id, req.body);
        res.status(200).send({
            success: true,
            message: 'The theatre deleted successfully',
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'The theatre could not deleted',
            error: error
        });
    }
});

module.exports = theatreRoute