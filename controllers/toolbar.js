(function () {
    'use strict';

    app.directive('toolbar', toolbar);
    function toolbar() {
        return {
            templateUrl: "views/toolbar.html",
            controller: toolbarController,
            controllerAs: 'toolbar'
        }
    }


    function toolbarController($scope, $http, $state, AuthenticationService) {

        //this shows the login Modal
        $scope.login = function () {
            $("#myModal").modal("show");
            //callback function execute when the user singIn or singUp
            //sevice.signin(callbackfunction(profile,token){
              //  savethe profile
           // })
        };

        //check is the token is correct else comes back to the principal page
        var token;
        if (localStorage['token']) {
            token = localStorage['token'];
        } else {
            token = "Something";
        }

        AuthenticationService.checkToken(token);

        // this Logout the User
        $scope.logout = function () {

            var data = {
                token: token
            }

            $http.post('endpoints/logout.php', data).success(function (response) {
                localStorage.clear();
                $state.go("login");
            }).error(function (error) {
                console.error(error);
            });
        }


    }
})();