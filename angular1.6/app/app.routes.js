angular.module("todoApp").config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      template: "<login></login>",
    })
    .when("/inicio", {
      template: "<home></home>",
    })
    .when("/tarefas", {
      template: "<task></task>",
    })
    .when("/usuario", {
      template: "<task></task>",
    })
    .otherwise({ redirectTo: "/" });
});
