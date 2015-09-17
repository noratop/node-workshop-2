var http = require('http');
var request  = require('request');

var APIKey = '814d0e373e7fe92fe71b94abdddd015b';

var requestListener = function (req, response) {
    
    var word = req.url.substring(1).toLowerCase();
    
    var thesaurusReauestUrl = 'http://words.bighugelabs.com/api/2/'+ APIKey +'/'+word+'/json';

    if (word !== "" && word !== 'favicon.ico'){

        request(thesaurusReauestUrl, function(err, res, body) {
            
            var output = '<h1>Here are the synonyms found for the word "'+ word +'":</h1>';
            
            
            if (!err){
                var data = JSON.parse(body);
                
                console.log(data);
                
                output += "\n<ul>";

                if (data.adverb){
                    //console.log(data.adverb.syn);
                    output += "\n<li><b>As an adverb:</b></li>";
                    output += "\n<ul>";
                    data.adverb.syn.forEach(function(elt){
                        output += "\n<li>"+elt+'</li>';
                    });
                    output += "\n</ul>";
                }
                if (data.adjective){
                    output += "\n<li><b>As an adjective:</b></li>";
                    output += "\n<ul>";
                    data.adjective.syn.forEach(function(elt){
                        output += "\n<li>"+elt+'</li>';
                    });
                    output += "\n</ul>";
                }
                if (data.noun){
                    output += "\n<li><b>As a noun:</b></li>";
                    output += "\n<ul>";
                    data.noun.syn.forEach(function(elt){
                        output += "\n<li>"+elt+'</li>';
                    });
                    output += "\n</ul>";
                }
                if (data.verb){
                    output += "\n<li><b>As a verb:</b></li>";
                    output += "\n<ul>";
                    data.verb.syn.forEach(function(elt){
                        output += "\n<li>"+elt+'</li>';
                    });
                    output += "\n</ul>";
                }
                
                output += "\n</ul>";
            }
            else {
                output = 'Sorry no result was found for this word';
            }
            
            console.log(output);

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