
var myBlogApp = angular.module('myBlogApp' , [
    'ngRoute'
]);


myBlogApp.config(['$routeProvider','$httpProvider',
    function($routeProvider,$httpProvider) {
        $routeProvider.
        when('/home', {
            templateUrl: 'public/app/views/home.tpl.html',
            controller : 'homeController'
        }).
        when('/login', {
            templateUrl: 'public/app/views/login.tpl.html',
            controller : 'loginController'
        }).
        when('/createBlog', {
            templateUrl: 'public/app/views/createBlog.tpl.html',
            controller : 'blogController'
        }).
        when('/register', {
            templateUrl: 'public/app/views/register.tpl.html',
            controller : 'registerController'
        }).
        otherwise({
            redirectTo: '/'
        });

        $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
            return {
                response: function(response) {
                    return response;
                },
                responseError: function(response) {
                    if (response.status === 401 && $location.path() !== '/login') {
                        $location.url('/login');
                    }
                    return $q.reject(response);
                }
            };
        }]);
    }]
);