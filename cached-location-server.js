var http = require('http');
var request = require('request');

var cachedLocations = {};

var requestListener = function (req, response) {

    var locationInUrl = req.url.substring(1).toLowerCase();
    var APIKey = '&AIzaSyAd2WFdWK8DclKk_BHmEf4o1JQ4v1rk4_o';
    
    //console.log('locationInUrl: '+locationInUrl);

    if (locationInUrl !== 'favicon.ico'){
        if (locationInUrl !== ""){
            var output = '';
            var locationData = [] ;
            var requestUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + locationInUrl + "&" + APIKey;
    
            //console.log(cachedLocations);
            //console.log('requestUrl: '+requestUrl);
            //console.log('location in the cache ? ' + cachedLocations.hasOwnProperty(locationInUrl));
            
            if (cachedLocations.hasOwnProperty(locationInUrl)) {
                //console.log('in cache');
                locationData = cachedLocations[locationInUrl];
                
                if (locationData) {
                        var geoLocation = locationData.geometry.location;
                        output = 'Cached response: This location has a latitude of ' + geoLocation.lat + ' and a longitude of ' + geoLocation.lng;
                }
                else {
                    output = "Sorry this location can't be found";
                }
                
                response.writeHead(200);
                response.end(output);
            }
            else {
                request(requestUrl, function(err, res, body) {
                    //console.log('in request');
                    if (err) {
                    output = 'There was an error:' + err;           
                    }
                    else {
                        var data = JSON.parse(body);
                        locationData = data.results[0];
                        
                        cachedLocations[locationInUrl] = locationData;
                        //console.log(cachedLocations);
        
                        if (locationData) {
                            var geoLocation = locationData.geometry.location;
                            output = 'Fresh result: This location has a latitude of ' + geoLocation.lat + ' and a longitude of ' + geoLocation.lng;
                        }
                        else {
                            output = "Sorry this location can't be found";
                        }
                    }
                    //console.log(output);
                    response.writeHead(200);
                    response.end(output);
                });
            }
        }
        else {
            response.writeHead(200);
            response.end("Enter a location in the URL");
        }
    }
};

var server = http.createServer(requestListener);

server.listen(process.env.PORT, process.env.IP);