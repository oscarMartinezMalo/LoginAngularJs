
app.controller("LoginController", function($scope, $http, $state, AuthenticationService){

 var token ;
 if(localStorage['token']){
     token = localStorage['token'];     
 }else{
     token = "Something";
 }

    AuthenticationService.checkToken(token);
    // $scope.logout = function(){
    //     alert("Hola")
    //     var data = {
    //         token: token
    //     }

    //     $http.post('endpoints/logout.php',data).success(function(response){
    //         localStorage.clear();
    //         $state.go("login");
    //     }).error(function(error){
    //         console.error(error);
    //     });
    // }


    //Variables
    $scope.myVar="showSignUp";
    $scope.actionMethod= "signUserUp";
    $scope.userTaken = false;
    $scope.userPassNotExit=false;
    $scope.userTakenName="";
    $scope.shouldBeOpen = true;
    $scope.masterSignUpInfo={
        username:"",
        reusername:"",
        password:""
    };

    $scope.masterLoginInfo={
        username:"",
        password:""
    };

    $scope.signUpInfo={
        username:undefined,
        reusername:undefined,
        password:undefined
    };

     $scope.loginInfo={
        username:undefined,
        password:undefined
    };

    //Reset the form 
    $scope.reset = function(form) {             
        $scope.signUpInfo = angular.copy($scope.masterSignUpInfo);  
        $scope.loginInfo = angular.copy($scope.masterLoginInfo);  
        $scope.myForm.$setPristine();
        $scope.myForm.$setUntouched();
        $scope.userTaken = false;
        $scope.userPassNotExit=false;
        $scope.userTakenName="";
        // $scope.myForm.$setValidity();
        $scope.$apply();
      };

    //Show the Modal Window
    // $('#showModal').click(function(){        
    //    $("#myModal").modal("show");
    //     $scope.shouldBeOpen = true;
    // });
 
    // $scope.login=function(){
    //    $("#myModal").modal("show");
    //     $scope.shouldBeOpen = true;
    // };

    // CLean the Form to the initial values
    $('#myModal').on('hidden.bs.modal', function () {
        //document.getElementById("onlyForm").reset();  
        $scope.reset( $scope.Myform);
        $scope.shouldBeOpen = false;
    });
   
    //Functions
    $scope.signUserUp =function (){
        var data= {
            username: $scope.signUpInfo.username,
            password: $scope.signUpInfo.password
        }
        $http.post('endpoints/signup.php',data).success(function(response){

            if(typeof response === 'string' && JSON.parse(response) == "User already taken")
            {
               $scope.userTaken=true;
               $scope.userTakenName=$scope.signUpInfo.username;

            }else{
                if( response !== null && typeof response === 'object'){
                    console.log(response.token);
                    console.log(response.username);                    
                    localStorage.setItem("token",response.token);
                    $state.go("application"); 
                    //Fade out the back grey screen
                    $(".modal-backdrop").remove();
                    alert("User created succefully")
                }
            }
           
        }).error(function(error){
            console.error(error);
        });
    };

    $scope.loginUser = function (){   

        var data= {
            username: $scope.loginInfo.username,
            password: $scope.loginInfo.password
        }

        $http.post('endpoints/login.php',data).success(function(response){
            console.log(response);
            //alert(response);
            //if(response =="User is required" ||response == "Invalid email format"||response =="Password is required" || response === "Invalid password format" )
        if(typeof response === 'string')
            {
            //    $scope.userTaken=true;
            //    $scope.userTakenName=$scope.signUpInfo.username;
                //alert(response);
                if(JSON.parse(response) == "Wrong Email or password" || JSON.parse(response) == "Invalid password format"){
                    //this set the varible true then it'll will show the message in the form
                     $scope.userPassNotExit=true;
                }
                   
            }else if( response !== null && typeof response === 'object'){
                var administrator="admin@gmail.com";
                localStorage.setItem("token",response.token);
                if(response.username == administrator){
                    $state.go("admin");
                }else{
                $state.go("application");
                }
                $(".modal-backdrop").remove();
            }
            // localStorage.setItem("token",JSON.parse(response));
            // $state.go("application");

            //Fade out the back grey screen
            // $(".modal-backdrop").remove();
        }).error(function(error){
            console.error(error);
        });
    };
    //Init
});

 
