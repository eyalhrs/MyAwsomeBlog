angular.module('myBlogApp').component('userDetails', {
    bindings: {
        name: "<"
    },
    templateUrl: 'public/app/views/userDetails.tpl.html'
});