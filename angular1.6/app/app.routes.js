angular.module("todoApp").config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      template: "<login></login>",
    })
    .when("/registrar", {
      template: "<register></register>",
    })
    .when("/inicio", {
      template: "<home></home>",
    })
    .when("/tarefas", {
      template: "<task></task>",
    })
    .when("/usuario", {
      template: "<user></user>",
    })
    .otherwise({ redirectTo: "/" });
});
