var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var config = require('./config');
var mongoose = require('mongoose');
// var base64Uid = require('./user');

var path = require('path');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//var hash = require("./gravatar");

app.set('port', (process.env.PORT || 5000)); //Heroku sets env PORT to 5000

// set the 'dbUrl' to the mongodb url that corresponds to the
// environment we are in
app.set('dbUrl', process.env.MONGOLAB_URI || config.db[app.settings.env]);
// connect mongoose to the mongo dbUrl
mongoose.connect(app.get('dbUrl'));
//...

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'DkTv37Ls',
  resave: true,
  saveUninitialized:true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    mongoOptions: {},
    ttl: 14 * 24 * 60 * 60
  })
}));

app.use('/*', function(request, response) {
    var file = request.params[0] || 'views/index.html';
    response.sendFile(path.join(__dirname, './public', file));
});

app.listen(app.get('port'), function() {
    console.log("App is running on port: ", app.get('port'));
});
