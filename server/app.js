var express = require('express');
var app = express();
// var base64Uid = require('./user');

var path = require("path");
// var cookieParser = require('cookie-parser');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);

//var hash = require("./gravatar");

app.set('port', (process.env.PORT || 5000)); //Heroku sets env PORT to 5000

// app.use(cookieParser());
// app.use(session({
//   secret: 'DkTv37Ls',
//   resave: true,
//   saveUninitialized:true,
//   store: new MongoStore({
//     url: 'mongodb://localhost/27017',
//     ttl: 14 * 24 * 60 * 60,
//   })
// }));

app.get('/*', function(request, response) {
    var file = request.params[0] || 'views/index.html';
    response.sendFile(path.join(__dirname, './public', file));
});

app.listen(app.get('port'), function() {
    console.log("App is running on port: ", app.get('port'));
});
