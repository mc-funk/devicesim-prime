var app = require('express');
var router = app.Router();
var bodyParser = require('body-parser');
var rpc = require('onep/rpc');
var util = require('util')


//RPC CALL: rpc.caoo(auth, procedure, arguments, callback)
//TODO: RPC call for get devices and their resources, store RIDs in DOM Data

router.get('/', function (req, res, next) {
  var thisCik = req.session.cik;
  console.log("cik retrieved: ", thisCik);
  var data = rpc.tree(
    thisCik,
    {
      visit: function (rid, type, depth) {
        console.log(rid + ' (' + type + ') depth:' + depth);
    },
      types: ['dataport', 'datarule', 'dispatch'],
      info: function(rid, type, depth) {
        return type === 'client' ? {aliases: true, basic: true, key: true, subscribers: true} : null;
      }
    },
    function(err, tree) {
      console.log(err ? 'Error ' + err : JSON.stringify(tree, null, 2));
      res.send(err ? 'Error ' + err : JSON.stringify(tree, null, 2));
    }
  );

});


// rpc.tree(
//   thisCik,
//   {
//     visit: function (rid, type, depth) {
//     console.log(rid + ' (' + type + ') depth:' + depth);
//   },
//     types: ['dataport', 'datarule', 'dispatch', 'client'],
//     info: function(rid, type, depth) {
//       return type === 'client' ? {basic: true, key: true} : null;
//     }
//   },
//   function(err, tree) {
//     console.log(err ? 'Error ' + err : JSON.stringify(tree, null, 2));
//   }
// );

//TODO: RPC call to create device
// rpc.call(cik, 'CALL', [ARGS], function(err, rpcresponse, httpresponse) {
//   if (err) {
//     console.log("RPC call error: ", err);
//   } else {
//     console.log('response: ' + util.inspect(rpcresponse, false, null, true));
//   }
// });

//TODO: RPC call to write data to a given dataport

//TODO: RPC calls to get/edit/create lua scripts on a device


console.log("rpc routing loaded");
module.exports = router;
