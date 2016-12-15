angular.module('myBlogApp').controller('registerController', ['$scope','$location','authService', function($scope,$location,authService) {
    $scope.msg = "";
    $scope.register = function () {
        authService.register($scope.name,$scope.password).then(function (result) {
            console.log(result);
            if (result == 200) {
                $location.path("/home");
            } else {
                $scope.msg = 'Failure, try to register again';
            }
        },function (error) {
            $scope.msg = 'Failure, try to register again';
            $scope.name = "";
            $scope.password = "";
        });
    };



}]);
