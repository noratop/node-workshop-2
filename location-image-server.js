var http = require('http');
var request = require('request');

var requestListener = function (req, response) {
    
    var locationInUrl = req.url.substring(1).toLowerCase();
    var APIKey = 'AIzaSyDdqjo8OHWLXd7QnQE0HtHPoAAHrFh3sPM';
    
    console.log(locationInUrl);

    if (locationInUrl !== 'favicon.ico'){
        if (locationInUrl !== ""){
            var output = '';
            var locationData = [] ;
            var imageUrl = "https://maps.googleapis.com/maps/api/staticmap?";
    
            //location parameters
            var center = locationInUrl; // i.e locationInUrl || "City Hall, New York, NY" should be converted to "City+Hall,New+York,NY"
            var zoom = 12;

            //the size of the image
            var size = '600x600';
            
            //Exemple: https://maps.googleapis.com/maps/api/staticmap?center=Berkeley,CA&zoom=14&size=400x400&key=

            imageUrl += 'center=' + center + '&zoom=' + zoom + '&size=' + size + '&key=' + APIKey;
 
            console.log(imageUrl);
            
            output += '<h1><img src='+imageUrl+' alt="Location Map" /></h1>'
            
            response.writeHead(200);
            response.end(output);
        }
        else {
            response.writeHead(200);
            response.end("Enter a location in the URL");
        }
    }
};

var server = http.createServer(requestListener);

server.listen(process.env.PORT, process.env.IP);