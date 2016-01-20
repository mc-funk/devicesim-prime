var mongoose = require('mongoose');
var app = require('express');
var router = app.Router();
var bodyParser = require('body-parser');
var path = require('path');
// var cookieParser = require('cookie-parser');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);

router.get('/', function (req, res, next) {
  console.log("req.session: ", req.session);
  res.send(req.session);
});

router.post('/cik', function(req, res, next) {
  req.session.authType = "cik";
  console.log(req.body)
  req.session.cik = req.body.cik;
  console.log("params set: cik=", req.session.cik);
  res.end("cik sent");
});

router.post('/uauth', function(req, res, next) {
  req.session.authType = "uauth";
  req.session.uauth = req.body.uauth;
  req.session.url = req.body.url;
  console.log("params set for User Auth (Portals API): ", req.session.uauth, req.session.url);
  res.end("uauth sent");
});

router.delete('/', function(req, res, next) {
  req.session.authType = null;
  req.session.uauth = null;
  req.session.url = null;
  req.session.cik = null;
  res.end("all auth deleted");
})

router.delete('/cik', function(req, res, next) {
  req.session.cik = null;
  res.end("cik auth deleted");
})

router.delete('/uauth', function(req, res, next) {
  req.session.authType = null;
  req.session.uauth = null;
  req.session.url = null;
  req.session.cik = null;
  res.end("uauth deleted");
})

console.log("auth routing loaded");
module.exports = router;
