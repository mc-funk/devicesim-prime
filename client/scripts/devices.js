var app=angular.module('app', []);

console.log("devices.js loading");
app.controller("DeviceController", ['$scope', '$http', function($scope, $http) {
    //Define a single cats and the set of cats (used in conj with ng-repeat in index.html)
    console.log("app.controller entered");
    $scope.device = {};
    $scope.childDevice = {};
    $scope.devices = [];
    //Create a function to retrieve cat information from server and redefine $scope.cats accordingly.
    function deleteByRid(rid) {
      console.log(rid);
      var data = window.prompt("Enter the datapoint you would like to add below.");
      if (data === null) {
        console.log("CANCEL write for rid "+ rid);
        return;
      }
      console.log("CONFIRM write for rid "+ rid +" data=" + data);
      //DELETE CALL GOES HERE
      return $http.put('rpc/resource/'+rid+"/"+data).then(function(response){
          if(response.status !== 200) {
              throw new Error('/rpc/resource put call from deleteByRid failed');
          } else if (!response.data.info) {
              throw new Error("RPC error: ", response.status);
            }
          console.log("resource put call successful for: "+rid);
          });
    }

    function writeToDataport(DeviceRid, DataPortRid) {
      var data = window.prompt("Enter the datapoint you would like to add below.");
      if (data === null) {
        console.log("CANCEL write for rid "+ DataPortRid);
        return;
      }
      console.log("CONFIRM write for rid "+ DataPortRid +" data=" + data);
      //DELETE CALL GOES HERE
      return $http.put('rpc/resource/'+DeviceRid+"/"+DataPortRid+"/"+data).then(function(response){
          if(response.status !== 200) {
              throw new Error('/rpc/resource put call from deleteByRid failed');
          } else if (!response.data.info) {
              throw new Error("RPC error: ", response.status);
            }
          console.log("resource put call successful for: "+DataPortRid);
          });
    }


    function getDevices() {
        //We defined the .get('/cats') functionality in the server-side index.js!
        //console.log("getDevices got called at all");
        return $http.get('/rpc').then(function(response){
            if(response.status !== 200) {
                throw new Error('/rpc call from getDevices failed');
            } else if (!response.data.info) {
                throw new Error('no valid auth provided');
              }

            //console.log("getDevices response: ", response)
            $("#deviceTest").show();
            var children = response.data.children;
            var info = response.data.info;

            children = addAliases(children, info);

            $scope.device = {};
            $scope.devices = children;
            console.log("scope.devices set to: ", children);

            return response.data.children;

            function addAliases(children, info) {
              //console.log("getAliases called:", children, info);
              /* info.aliases is an object with one property each for only the
              child resources that have aliases. The name of each property is
              the RID of the child resource. This logic checks for property by RID
              and grabs the alias. */
              for (var j=0; j< children.length; j++) {
                console.log(children[j].rid,":", info.aliases[children[j].rid], ":", children[j].type);
                var tempAlias = info.aliases[children[j].rid];
                if (tempAlias) {
                  children[j].name = tempAlias[0];
                } else {
                  children[j].name = "Resource with no alias";
                }
                if (children[j].type=="client") {
                  storeDeviceCik(children[j].rid);
                }
                //Check to see if there are children of children
                //Add aliases to the child's children wobject if so
                if (children[j].children && children[j].children.length > 0) {
                    children[j].children = addAliases(children[j].children, children[j].info);
                }
              }
              return children;
            }

            function storeDeviceCik(childRid) {
              console.log("storeDeviceCiks called");
              return $http.get('rpc/getcik/'+childRid).then(function(response){
                  if(response.status !== 200) {
                      throw new Error('/rpc/getcik put call from storeDeviceCiks failed');
                  } else if (!response.data.info) {
                      throw new Error("RPC getcik error: ", response.status);
                  }
                  return ("cik stored for: "+childRid)
                  console.log("cik stored for: "+childRid);
                  });
            }
        });
    };



    getDevices();
    $scope.deleteByRid=deleteByRid;
    $scope.getDevices=getDevices;
    $scope.writeToDataport=writeToDataport;

    //Post information to the server, which will then update the server and database.
    // $scope.add = function(cat) {
    //     //Use .then to chain functionality - add, then fetch the new list with added cat.
    //     //we defined the post '/add' functionality in the server-side index.js!
    //     return $http.post('/add', cat).then(fetchCats);
    // };
    //run right away, in case there aren't any kittehs in teh databasxorz.
    //Not sure if this is necessary in this context
    //getDevices();
}]);
