var http = require('http');
var char = require('./library/charfunction');

var requestListener = function (req, response) {
    
    char.getFirstAndLast('Hello World', function(result){
        setTimeout(function(){
            response.writeHead(200);        
            response.end(result);
            console.log('in callback : '+result);
        },3000);
    });
    
    console.log('after getFirstAndLast');
};

var server = http.createServer(requestListener);

server.listen(process.env.PORT, process.env.IP);