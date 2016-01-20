var express = require('express');
var app = express();
var config = require('./config');
var path = require('path');
var mongoose = require('mongoose');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var index = require('./index')
var auth = require('./auth');
// var base64Uid = require('./user');

app.set('port', (process.env.PORT || 5000)); //Heroku sets env PORT to 5000

// set the 'dbUrl' to the mongodb url that corresponds to the
// environment we are in
app.set('dbUrl', process.env.MONGOLAB_URI || config.db[app.settings.env]);
// connect mongoose to the mongo dbUrl
mongoose.connect(app.get('dbUrl'));



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json);
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

app.use('/auth', auth);
app.use('/', index);

app.listen(app.get('port'), function() {
    console.log("App is running on port: ", app.get('port'));
});
