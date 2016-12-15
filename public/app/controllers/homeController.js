angular.module('myBlogApp').controller('homeController', ['$scope','$location','authService', function($scope,$location,authService) {
    $scope.currentMenu = "viewBlogs";
    $scope.switchTo = function (menu) {
        switch (menu) {
            case 'createBlog':
                $scope.currentMenu = "createBlog";
            break;
            case 'viewBlogs':
                $scope.currentMenu = "viewBlogs";
            break;
        }
    };
    $scope.logout = function () {
        authService.logout().then(function (result) {
            $location.path("/login");
        });
    };



}]);
