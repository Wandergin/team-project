var sentence = "reservation for 1 at YourMumsHouse tomorrow at midday.";

var Knwl = require("./node_modules/knwl.js");
var knwlInstance = new Knwl('english');
knwlInstance.register('dates', require('./default_plugins/dates.js'));
knwlInstance.register('times', require('./default_plugins/times.js'));
knwlInstance.register('places', require('./default_plugins/places.js'));

knwlInstance.init(sentence);

var dates = knwlInstance.get('dates');
var times = knwlInstance.get('times');
var places = knwlInstance.get('places');

console.log("The sentence was:\n"+sentence);

console.log("\n\nDates detected:");
console.log(dates);

console.log("\n\nTimes detected:");
console.log(times);

console.log("\n\nPlaces detected:");
console.log(places);
