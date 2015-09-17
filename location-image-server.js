var http = require('http');
var request = require('request');

var requestListener = function (req, response) {

    var locationInUrl = req.url.substring(1);
    var APIKey = '&AIzaSyAd2WFdWK8DclKk_BHmEf4o1JQ4v1rk4_o';

    console.log(locationInUrl);

    request('https://maps.googleapis.com/maps/api/geocode/json?address=' + locationInUrl + '&' + APIKey, function(err, res, body) {
      
        if (err) {
        response.writeHead(200);
        response.end('There was an error:' + err);           
        }
        else {
          var data = JSON.parse(body);
          var firstResult = data.results[0];
          
          if (firstResult) {
            var geoLocation = firstResult.geometry.location;
          
            response.writeHead(200);
            response.end('This location has a latitude of ' + geoLocation.lat + ' and a longitude of ' + geoLocation.lng);           
          }
          else {
            response.writeHead(200);
            response.end("Sorry this location can't be found");                         
          }
      }
  });
};

var server = http.createServer(requestListener);

server.listen(process.env.PORT, process.env.IP);