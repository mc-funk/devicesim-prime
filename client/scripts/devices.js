var app=angular.module('app', []);
console.log("devices.js loading");
app.controller("DeviceController", ['$scope', '$http', function($scope, $http) {
    //Define a single cats and the set of cats (used in conj with ng-repeat in index.html)
    console.log("app.controller entered");
    $scope.device = {};
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
            var tempRid;
            for (var j=0; j< children.length; j++) {
              console.log(children[j].rid,":", response.data.info.aliases[children[j].rid]);
              tempRid = response.data.info.aliases[children[j].rid];
              if (tempRid) {
                children[j].name = response.data.info.aliases[children[j].rid][0];
              } else {
                children[j].name = "Unnamed resource";
              }
            }

            $scope.device = {};
            $scope.devices = children;
            console.log("scope.devices set to: ", children);

            return response.data.children;
        });
    };

    $scope.getDevices=getDevices();

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
