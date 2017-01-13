app.service('AuthenticationService', ["$http", "$state", function ($http, $state) {
    var self = this;
    self.checkToken = function (token) {
        var data = { token: token };

        $http.post("endpoints/checkToken.php", data).success(function (response) {

            if (response === "unauthorized") {
                $state.go("login");
            } else {
                return response;
            }
        }).error(function (error) {
            $state.go("login");
        })
    }
// method to SingIn
    self.singin = function () {  
        

    }

}]);

