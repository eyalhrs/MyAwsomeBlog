angular.module('myBlogApp').controller('blogViewController', ['$scope','$location','blogService', function($scope,$location,blogService) {
        var init = function () {
            blogService.get().then(function(response){
                if (response.data && Array.isArray(response.data)) {
                    $scope.blogs = response.data;
                }
            }, function(err){
                $scope.blogs = [];
            });
        };
        init();

}]);
