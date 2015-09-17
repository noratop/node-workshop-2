var fortune = require("/library/fortune");

var numberOfFortuneRequested = process.argv[2];

for (var i=0; i<numberOfFortuneRequested; i++)
{
    console.log(fortune.getFortune());
}