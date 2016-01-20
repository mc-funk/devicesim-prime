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

// router.post('/cik/', function(req, res, next) {
//   req.session.authType = "cik";
//   req.session.cik = req.body.cik;
//   console.log("params set: cik=", req.session.cik);
//   res.end("yes");
// });

// router.post('/uid/', function(req, res, next) {
//   req.session.authType = "uauth";
//   req.session.uauth = req.body.uauth;
//   req.session.url = req.body.url;
//   console.log("params set for User Auth (Portals API): ", req.session.uauth, req.session,url);
//   res.end("yes");
// });

console.log("auth routing loaded");
module.exports = router;
