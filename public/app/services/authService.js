angular.module('myBlogApp').service('authService', ['$http', function($http){

    this.login = function(name,password) {
        return $http.post('/login', {name: name, password: password}).then(function(response){
            return response.status;
        }, function(response) {
            return response.status;
        });
    };
    this.isLoggedIn = function() {
        return $http.get('/loggedin').then(function(response){
            return response;
        }, function(response) {
            return false;
        });
    };
    this.logout = function() {
        return $http.post('/logout').then(function(response){
            return response.status;
        }, function(response) {
            return response.status;
        });
    };
    this.register = function(name,password) {
        return $http.post('/register', {name: name, password: password}).then(function(response){
            return response.status;
        }, function(response) {
            return response.status;
        });
    };


}]);