function getFortune() {
    var fortunes = ["You'll feel much better once you've given up hope.","You have taken yourself too seriously.","Expect the worst, it's the least you can do.","You look tired.","And do you think (fop that I am) that I could be the Scarlet Pumpernickel?","Today is the last day of your life so far.","You will hear good news from one you thought unfriendly to you.","Are you making all this up as you go along?"];
    var fortuneIndex = Math.round((fortunes.length)*Math.random());
    return fortunes[fortuneIndex];
}

module.exports = {
    getFortune : getFortune
}
