var app = require('express');
var router = app.Router();
var bodyParser = require('body-parser');
var rpc = require('onep/rpc');
var util = require('util');
var cookieParser = require('cookie-parser');
const session = require('express-session');

//RPC CALL: rpc.caoo(auth, procedure, arguments, callback)
//TODO: RPC call for get devices and their resources, store RIDs in DOM Data

router.get('/', function (req, res, next) {
  var thisCik = req.session.cik;
  console.log("cik retrieved: ", thisCik);
  rpc.tree(
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

router.get('/info', function (req, res, next) {
  console.log("/info called");
  var thisCik = req.session.cik;
  console.log("cik retrieved: ", thisCik);
  //{cik: thisCik}
  rpc.call(thisCik, 'info', [{"alias": ""}, {}],
    function(err, rpcresponse, httpresponse) {
      if (err) {
        console.log('error: ' + err);
      } else {
        console.log(rpcresponse)
        if (rpcresponse[0].status === 'ok') {
          console.log("result: ", rpcresponse[0].result);
          req.session.portalName = rpcresponse[0].result.description.name;
          console.log("portalName set:" + req.session.portalName);
          return rpcresponse[0].result;
        } else {
          console.log('Bad status: ' + rpcresponse[0].status);
        }
      }
  });
});

/*
var childArray = {}
function buildChildArray
  //tree.children = [array of child objects]
  var childRID = tree.children[0].rid
  childAlias = tree.children[0].info[childRID]
  numChildren = tree.children.children.length
  childArray = {
  		dataport: [],
  		datarule: [],
  		dispatch: []
  	};

  for (var i=0; i<numChildren; i++) {
  	tempType = tree.children.children[i].type;

  	tempChildObj = {
  		rid: tree.children.children[i].rid
  	}

  	tempChildObj.rid
  	//Do an info call for all teh kids and stick the info somewhere
  	children[tempType].push(tempChildObj);
  }

*/
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
