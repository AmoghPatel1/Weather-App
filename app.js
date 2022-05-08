const { response } = require('express');
const express = require('express');
const { json } = require('express/lib/response');
const https = require('https')
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    let city = req.body.city;
    const apiKey = process.env.apiKey;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units="+ unit + "&appid=" + apiKey;
    https.get(url, function (response) {
        // console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            // console.log(weatherData);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon +"@2x.png";
            res.write("<p>The weather is currently " + description + "</p>")
            res.write("<h1>The temperature in "+ city +" is " + temp + " degree Celsius.</h1>")
            res.write("<img src="+imageURL+">")
            res.send();
        })
    })
})






app.listen(3000, function () {
    console.log("Server is listening on port 3000.");
})