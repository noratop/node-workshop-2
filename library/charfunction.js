//firstChar CPS
function getFirstChar(strInput,ret){
    if (typeof strInput === 'string') {ret(strInput[0]);}
    else {ret("Please provide a string as input");}
}

//lastChar CPS
function getLastChar(str,ret) {
    if (typeof str === 'string') {ret(str[str.length - 1]);}
    else {ret("Please provide a string as input");}
}



//test of firstChar 
//console.log(firstChar('this_is_test',function(str){console.log(str)}));


//Create a function that takes a string and a continuation (callback)
//Your function should use the two previous functions you created to "return" a string 
//that contains both the first and last character of the initial string

function getFirstAndLast(str,callback){
    getFirstChar(str,function(firstChar){
        getLastChar(str,function(lastChar){
            callback(firstChar+lastChar);
        });
    });
}

module.exports = {
    getFirstChar : getFirstChar,
    getLastChar : getLastChar,
    getFirstAndLast : getFirstAndLast
}