angular.module('myBlogApp').controller('baseController', ['$scope','$location','authService', function($scope,$location,authService) {


    var init = function () {
        authService.isLoggedIn().then(function (result) {
            console.log(result);
            if (result.data !== false) {
                $location.path("/home");
            } else {
                $location.path("/login");
            }
        });
    };
    init();

}]);
