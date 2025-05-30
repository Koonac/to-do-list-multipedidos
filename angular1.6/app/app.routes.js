angular.module("todoApp").config(function ($routeProvider) {
  $routeProvider
    .when("/home", {
      template: "<home></home>",
    })
    .when("/", {
      template: "<login></login>",
      templateUrl: "app/pages/auth/login.html",
      controller: "LoginController",
    })
    .when("/tasks", {
      templateUrl: "app/pages/task/index.html",
      controller: "TaskController",
    })
    .otherwise({ redirectTo: "/" });
});
