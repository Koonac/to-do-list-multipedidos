angular.module("todoApp").config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "app/views/home.html",
      controller: "HomeController",
    })
    .when("/login", {
      templateUrl: "app/views/auth/login.html",
      controller: "LoginController",
    })
    .when("/tasks", {
      templateUrl: "app/views/tasks/index.html",
      controller: "TaskController",
    })
    .otherwise({ redirectTo: "/login" });
});
