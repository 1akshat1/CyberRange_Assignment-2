const express = require('express')
const api = express()
const request = require('request');

//Get Request
api.get('/',function(req,res){
  res.sendFile(__dirname + '/views/index.html');
})
api.get('/locations',function(req,res){
  res.sendFile(__dirname + '/views/index.html');
})
api.get('/locations/:zip/', function (req, res) {
  var zip_code = req.params.zip;
  if(zip_code ==undefined || zip_code.length !=5){
      res.statusCode = 404;
      res.send('Enter Valid zipcode');
  }
  else{
    var scale = req.query.scale;
    if((scale) == 'celsius')
        scale ='c';
    else
      scale = 'f';

    //First request to get WOEID zip_code

    var first = function(parameter){
      request(parameter, function (err, response, body) {
      if(err){
        console.log('error:',error);
        res.send('index', {zip_code: null, error: 'Error, please try again'});
      } else {
        var woeid = JSON.parse(body);
        woeid_parsed = woeid.query.results.place[0].woeid;
        second(woeid_parsed,scale);
      }
    });
    }

    //Second Request to get the temperature

    var second = function(woeid_parsed,scale){
      var searchtext = "select item.condition from weather.forecast where woeid =" + woeid_parsed + " and u='"+scale+"'";
      var url = "https://query.yahooapis.com/v1/public/yql?q=" + searchtext + "&format=json";
        request(url, function (err, response, body) {
        if(err){
          console.log('error:', error);
          res.send('index', {weather: null, error: 'Error, please try again'});
        } else {
          var weather = JSON.parse(body);
          if(scale == 'c')
            var scale_disp = 'Celsius';
          else {
              var scale_disp = 'Fahrenheit';
            }
          res.statusCode = 200;
          res.json({Temperature:weather.query.results.channel.item.condition.temp,Scale: scale_disp })
        }
      });
    }
    var q = "https://query.yahooapis.com/v1/public/yql?q=SELECT woeid FROM geo.places WHERE text=" + zip_code + "&format=json";
    first(q);
  }

})

api.listen(8080, function () {
  console.log('Weather api listening on port 8080!')
})
