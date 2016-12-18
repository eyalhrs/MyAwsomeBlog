angular.module('myBlogApp').service('authService', ['$http', function($http){

    var currentUser = "";

    this.login = function(name,password) {
        return $http.post('/login', {name: name, password: password}).then(function(response){
            currentUser = name;
            return response.status;
        }, function(response) {
            return response.status;
        });
    };
    this.isLoggedIn = function() {
        return $http.get('/loggedin').then(function(response){
            if (response.data !== false) {
                currentUser = response.data;
            }
            return response;
        }, function(response) {
            currentUser = "";
            return false;
        });
    };
    this.logout = function() {
        return $http.post('/logout').then(function(response){
            currentUser = "";
            return response.status;
        }, function(response) {
            return response.status;
        });
    };
    this.register = function(name,password) {
        return $http.post('/register', {name: name, password: password}).then(function(response){
            currentUser = name;
            return response.status;
        }, function(response) {
            return response.status;
        });
    };
    this.getCurrentUser = function() {
        return currentUser;
    };

}]);