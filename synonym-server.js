var http = require('http');
var request  = require('request');

var APIKey = '814d0e373e7fe92fe71b94abdddd015b';

var requestListener = function (req, response) {
    
    var word = req.url.substring(1).toLowerCase();
    
    var thesaurusReauestUrl = 'http://words.bighugelabs.com/api/2/'+ APIKey +'/'+word+'/json';

    if (word !== "" && word !== 'favicon.ico'){

        request(thesaurusReauestUrl, function(err, res, body) {
            
            var output = '\nHere are the synonyms found for the "'+ word +'":\n';
            
            if (!err){
                var data = JSON.parse(body);
                
                console.log(data);
                
                if (data.adverb){
                    output += "\n\n\tAs an adverb: " + data.adverb.syn;
                }
                if (data.adjective){
                    output += "\n\n\tAs an adjective: " + data.adjective.syn;
                }
                if (data.noun){
                    output += "\n\n\tAs an noun: " + data.noun.syn;
                }
                if (data.verb){
                    output += "\n\n\tAs an verb: " + data.verb.syn;
                }
            }
            else {
                output = 'Sorry no result was found for this word';
            }
            
            response.writeHead(200);        
            response.end(output);
            
        });
    }
    else{
        response.writeHead(200);
        response.end("Enter a word in the URL");    
    }
};

var server = http.createServer(requestListener);

server.listen(process.env.PORT, process.env.IP);