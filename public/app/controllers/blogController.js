angular.module('myBlogApp').controller('blogController', ['$scope','$location','blogService', function($scope,$location,blogService) {
        $scope.msg = "";
        $scope.create = function () {
            var title = $scope.title;
            var text = $scope.text;
            blogService.create(title,text).then(function(response){
                if (response === 200) {
                    $scope.msg = "Blog was created successfully, refresh to view it";
                    $scope.title = "";
                    $scope.text = "";
                } else {
                    $scope.msg = "An error occurred while creating blog";
                }
            }, function(err){
                $scope.msg = "An error occurred while creating blog";
            });
        };

}]);
