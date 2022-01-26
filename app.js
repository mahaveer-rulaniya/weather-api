// Loading modules from express
const express = require("express");

// Node.js built in module HTTP and to include the HTTP module we use require() method
const http = require("http");

// npm library use to process data sent through http request body
const bodyParser= require("body-parser");

// make the express application inside the app name, its like creating object for a class
const app = express();

// transforms the url encoded request into JS accessible variables
app.use(bodyParser.urlencoded({ extended: true}));


// GET the data or files from the given source
app.get("/", function(req, res){
    res.sendFile(__dirname +"/index.html");

});

// Send data to the server and respond to the client using Response
app.post("/", function(req, res){

    // Get the cityname filled in the html input form
    const query = req.body.cityName;

    const apiKey = "bace3d6796dbd95d79954a7d8ccf1960";
    const unit = "metric";

    // connecting to the api while taking care of authentication, endpoint, paths and parameters
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" + apiKey + "&units=" +unit;

    // Retrive the information from the server
    http.get(url, function(response){
        console.log(response.statusCode);

        //The 'on' method attaches an event listener (a function) for a certain event
        response.on("data", function(data){
            //parses a JSON string, constructing a JS value
            const weatherData = JSON.parse(data)

            // retreving the data from the JSON
            const temp = weatherData.main.temp
            const disc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imgUrl="http://openweathermap.org/img/wn/" + icon + "@2x.png"

            //displays the data as Response
            res.write("<h4>The Weather is Currently "+ disc +"</h4>");
            res.write("<h2>The temperature in "+query+" is "+ temp + " degree Celcius </h2>");
            res.write("<img src=" + imgUrl + ">");

            res.send();

        })
    })
})


// used to bind and listen the connections on the specified host and port
app.listen(3000, function() {
    console.log("Yep it is running");
});