angular.module('myBlogApp').controller('loginController', ['$scope','$location','authService', function($scope,$location,authService) {

    $scope.login = function () {
        authService.login($scope.name,$scope.password).then(function (result) {
            console.log(result);
            if (result == 200) {
                $location.path("/home");
            } else {
                $scope.msg = 'Failure, try to login again';
            }
        });
    };



}]);
