const express = require('express'); // library for making the app a REST API app
const bodyParser = require('body-parser'); // library for retrieving json data from requests 
const mongoose = require('mongoose'); // MongoDB Library for nodejs 
const Movie = require('./models/movie');

// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/cinema');
mongoose.Promise = global.Promise;

//for retrieving json data from requests 
app.use(bodyParser.json());



app.get("/get_all_movies", async function(req, res){
    //write your logic here

    //connect to the database and get the movies from the collection
    const moviesList = await Movie.find({ });

    //return the movies to the user requesting for it
    return res.status(200).json({
        moviesList
    });
});



app.post("/save_movie", async function(req, res) {
    //write your logic here
    console.log("save movie request. request body is :", req.body);

    const { title, genre, year } = req.body; //This is how you extract or retrieve the individual request body
    console.log(title, genre, year);

    //validations: if all three fields are not provided or even if one field is empty, then return an error message
    if (!(title && genre && year)) {
        res.status(400).json({
            message: "Kindly provide all necessary fields"
        }); 
    }

    // save the movie in the collection
    const movieCreated = await Movie.create({ title: title, genre: genre, yearOfRelease: year});

     //return the movies to the user requesting for it
    res.status(200).json({
        message: "Your movie was created successfully",
        movieCreated
    }); 
});






// listen for request
app.listen(4000, function () {
    console.log("now listening for requests");
});