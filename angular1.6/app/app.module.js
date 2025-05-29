angular.module("todoApp", ["ngRoute"]).config(function ($httpProvider) {
  $httpProvider.interceptors.push("RequestInterceptor");
});

/**
 * Responsável por iniciar o agendamento do 
 * token refresh se o usuário estiver autenticado.
 * sempre que o usuário iniciar a aplicação
 */
angular.module("todoApp").run(function (AuthService) {
  if (AuthService.isAuthenticated()) {
    AuthService.scheduleTokenRefresh();
  }
});
