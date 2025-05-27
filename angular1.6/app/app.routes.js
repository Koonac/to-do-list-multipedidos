angular.module('todoApp').config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/views/home.html',
      controller: ''
    })
    .when('/login', {
      templateUrl: 'app/views/login.html',
      controller: 'LoginController'
    })
    .when('/tasks', {
      templateUrl: 'app/views/tasks.html',
      controller: 'TaskController'
    })
    .otherwise({ redirectTo: '/login' });
});
