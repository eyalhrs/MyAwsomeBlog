angular.module('myBlogApp').service('blogService', ['$http', function($http){

    this.create = function(title,text) {
        return $http.post('/blog/add', {title: title, text: text}).then(function(response){
            return response.status;
        }, function(response) {
            return response.status;
        });
    };

    this.get = function() {
        return $http.get('/blog/get').then(function(response){
            return response;
        }, function(response) {
            return response;
        });
    };

}]);