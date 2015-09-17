var http = require('http');
var request = require('request');

var cachedLocations = [];

var requestListener = function (req, response) {

    var locationInUrl = req.url.substring(1).toLowerCase();
    var APIKey = '&AIzaSyAd2WFdWK8DclKk_BHmEf4o1JQ4v1rk4_o';

    if (locationInUrl !== "" && locationInUrl !== 'favicon.ico'){
        
        var locationInCached = false;
        
        cachedLocations.forEach(function(element){
            if (locationInUrl === element[0]) {
                console.log('in cache');
                
                locationInCached = true;
                response.writeHead(200);
                var geoLocation = element[1].geometry.location;
                response.writeHead(200);
                response.end('Cached response: This location has a latitude of ' + geoLocation.lat + ' and a longitude of ' + geoLocation.lng);    
                return;
            }
        });
        
        console.log(locationInCached);

        if(!locationInCached){
            request('https://maps.googleapis.com/maps/api/geocode/json?address=' + locationInUrl + '&' + APIKey, function(err, res, body) {
                            console.log('request');

                if (err) {
                response.writeHead(200);
                response.end('There was an error:' + err);           
                }
                else {
                    var data = JSON.parse(body);
                    var firstResult = data.results[0];
                    
                    cachedLocations.push([locationInUrl,firstResult]);
                    console.log('cachedLocations = ' + cachedLocations);
    
                    if (firstResult) {
                        var geoLocation = firstResult.geometry.location;
                        response.writeHead(200);
                        response.end('Fresh result: This location has a latitude of ' + geoLocation.lat + ' and a longitude of ' + geoLocation.lng);           
                    }
                    else {
                        response.writeHead(200);
                        response.end("Sorry this location can't be found");                         
                    }
                }
            });
        }
    }
    else {
        response.writeHead(200);
        response.end("Enter a location in the URL");    
    }
};

var server = http.createServer(requestListener);

server.listen(process.env.PORT, process.env.IP);