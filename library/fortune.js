module.export = {
    getFortune : getFortune
}

function getFortune() {
    var fortunes = ['fortune1','fortune2','fortune3','fortune4','fortune5','fortune6','fortune7','fortune8'];
    var fortuneIndex = Math.round((fortunes.length)*Math.random());
    return fortunes[fortuneIndex];
}
