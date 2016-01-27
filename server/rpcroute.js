var app = require('express');
var router = app.Router();
var bodyParser = require('body-parser');
var rpc = require('onep/rpc');
var util = require('util');
var cookieParser = require('cookie-parser');
// const session = require('express-session');

//RPC CALL: rpc.caoo(auth, procedure, arguments, callback)
//TODO: RPC call for get devices and their resources, store RIDs in DOM Data
router.put('/resource/:parentrid/:rid/:dp', function(req, res, next) {
  console.log("write /resource called");
  console.log("cik retrieved: ", thisCik);
  var thisRid = req.params.rid;
  var parentRid = req.params.parentrid;
  if (req.session.deviceCik[parentRid]) {
    var thisCik = req.session.deviceCik[parentRid];
  } else {
    res.send("Error: deviceCik not stored");
  }
  var thisDataPoint = req.params.dp;
  rpc.call(thisCik, 'write', [thisRid, thisDataPoint],
    function(err, rpcresponse, httpresponse) {
      if (err) {
        console.log('write CALL ERR: ' + err);
        res.send(err);
      } else {
        if (rpcresponse[0].status === 'ok') {
          //console.log("result: ", rpcresponse[0].result);
          console.log("data written:" + thisDataPoint);
          res.send({"info":[thisRid, thisDataPoint]});
        } else {
          console.log('Bad status: ' + rpcresponse[0].status);
          req.session.portalName = null;
        }
      }
  });
});

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
        console.log('INFO CALL ERR: ' + err);
        res.send(err);
      } else {
        if (rpcresponse[0].status === 'ok') {
          //console.log("result: ", rpcresponse[0].result);
          req.session.portalName = rpcresponse[0].result.description.name;
          console.log("portalName set:" + req.session.portalName);
          res.send(rpcresponse[0].result);
        } else {
          console.log('Bad status: ' + rpcresponse[0].status);
          req.session.portalName = null;
        }
      }
  });
});

router.get('/getCik/:rid', function (req, res, next) {
  console.log("/getCik/:rid called");
  var thisCik = req.session.cik;
  var thisRid = req.params.rid;
  console.log("cik retrieved: ", thisCik);
  //{cik: thisCik}
  rpc.call(thisCik, 'info', [thisRid, {"key": true}],
    function(err, rpcresponse, httpresponse) {
      if (err) {
        console.log('INFO CALL ERR: ' + err);
        res.send(err);
      } else {
        if (rpcresponse[0].status === 'ok') {
          console.log("info/:rid get result: ", rpcresponse[0].result);
          //req.session.portalName = rpcresponse[0].result.description.name;
          //console.log("portalName set:" + req.session.portalName);
          if (!req.session.deviceCik) {
            req.session.deviceCik = {};
          }
          req.session.deviceCik[thisRid] = rpcresponse[0].result.key;
          console.log("req.session.deviceCik: ", req.session.deviceCik)
          res.send("device key saved");
        } else {
          console.log('Bad status: ' + rpcresponse[0].status);
          req.session.portalName = null;
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
