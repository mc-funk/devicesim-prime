CryptoJS = require("./md5");


function hash(input) {
    input = input.toString();
    input = input.trim();
    input = input.toLowerCase();
    console.log("https://www.gravatar.com/" + CryptoJS(input) + ".json?callback=displayGravatar");
    return "https://www.gravatar.com/" + CryptoJS(input) + ".json?callback=displayGravatar";
}

module.exports = hash;
