var app=angular.module('app', []);

app.controller("DeviceController", ['$scope', '$http', function($scope, $http) {
    //Define a single cats and the set of cats (used in conj with ng-repeat in index.html)
    $scope.device = {};
    $scope.devices = [];
    //Create a function to retrieve cat information from server and redefine $scope.cats accordingly.
    var getDevices = function() {
        //We defined the .get('/cats') functionality in the server-side index.js!
        console.log("getDevices got called at all");
        return $http.get('/rpc').then(function(response){
            if(response.status !== 200) {
                throw new Error('/rpc call from getDevices failed');
            }
            console.log("getDevices response: ", response)
            $scope.device = {};
            $scope.devices = response.data.children;
            console.log("scope.devices set to: ", response.data.children);
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
