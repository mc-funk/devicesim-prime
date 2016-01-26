var app=angular.module('app', []);
console.log("devices.js loading");
app.controller("DeviceController", ['$scope', '$http', function($scope, $http) {
    //Define a single cats and the set of cats (used in conj with ng-repeat in index.html)
    console.log("app.controller entered");
    $scope.device = {};
    $scope.childDevice = {};
    $scope.devices = [];
    //Create a function to retrieve cat information from server and redefine $scope.cats accordingly.
    function getDevices() {
        //We defined the .get('/cats') functionality in the server-side index.js!
        console.log("getDevices got called at all");
        return $http.get('/rpc').then(function(response){
            if(response.status !== 200) {
                throw new Error('/rpc call from getDevices failed');
            }
            console.log("getDevices response: ", response)

            var children = response.data.children;
            var info = response.data.info;

            // var tempRid;
            // for (var j=0; j< children.length; j++) {
            //   console.log(children[j].rid,":", response.data.info.aliases[children[j].rid]);
            //   tempRid = response.data.info.aliases[children[j].rid];
            //   if (tempRid) {
            //     children[j].name = response.data.info.aliases[children[j].rid][0];
            //   } else {
            //     children[j].name = "Unnamed resource";
            //   }
            // }
            children = addAliases(children, info);

            $scope.device = {};
            $scope.devices = children;
            console.log("scope.devices set to: ", children);

            function addAliases(children, info) {
              console.log("getAliases called:", children, info);
              /* info.aliases is an object with one property each for only the
              child resources that have aliases. The name of each property is
              the RID of the child resource. This logic checks for property by RID
              and grabs the alias. */
              for (var j=0; j< children.length; j++) {
                console.log(children[j].rid,":", info.aliases[children[j].rid]);
                var tempAlias = info.aliases[children[j].rid];
                if (tempAlias) {
                  children[j].name = tempAlias[0];
                } else {
                  children[j].name = "Resource with no alias";
                }
                //Check to see if there are children of children
                //Add aliases to the child's children wobject if so
                if (children[j].children && children[j].children.length > 0) {
                    children[j].children = addAliases(children[j].children, children[j].info);
                }
              }
              return children;
            }
            return response.data.children;
        });
    };
    getDevices();
    $scope.getDevices=getDevices;

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
