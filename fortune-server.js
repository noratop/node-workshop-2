var http = require('http');
var fortunelib = require("/home/ubuntu/workspace/library/fortune");

var requestListener = function (request, response) {
        
        var fortune = fortunelib.getFortune()
        response.writeHead(200);
        response.end(fortune);
};

var server = http.createServer(requestListener);

server.listen(process.env.PORT, process.env.IP);