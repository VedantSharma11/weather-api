const express= require("express");
const bodyParser= require("body-parser");
const https= require("https");

const app=express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    const apikey="<use you api key here>"; // sign up on openweatherapi.com and generate your api key
    const query=req.body.cityname;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units=metric";

    https.get(url, function(response){
       console.log(response.statusCode);
       response.on("data", function(data){
          const weatherdata= JSON.parse(data);
          const weatherdescription= (weatherdata.weather[0].description).toUpperCase();
          const weathericon= weatherdata.weather[0].icon;
          const temp= weatherdata.main.temp;
          const imgurl= "http://openweathermap.org/img/wn/"+weathericon+"@2x.png"
          res.write("<h1>The weather in "+query+" is currently "+weatherdescription+".</h1>");
          res.write("<h4>The temperature in "+query+ " is "+temp+" degree celcius.</h4>");
          res.write("<img src="+imgurl+">");
          res.send();
       });
    });

});

app.listen(process.env.PORT || 3000, function(){
    console.log("server is up & running");
});
