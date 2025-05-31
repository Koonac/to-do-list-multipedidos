angular.module("todoApp", ["ngRoute"]).config(function ($httpProvider) {
  $httpProvider.interceptors.push("RequestInterceptor");
});

angular.module("todoApp").run(function ($rootScope, $location, AuthService) {
  const publicRoutes = ["/", "/registrar"];

  /**
   * Responsável por validar o acesso as rotas
   */
  $rootScope.$on("$routeChangeStart", function (event, next) {
    if (
      !AuthService.isAuthenticated() &&
      !publicRoutes.includes(next.originalPath)
    ) {
      event.preventDefault();
      $location.path("/");
    }
  });

  /**
   * Responsável por iniciar o agendamento do
   * token refresh se o usuário estiver autenticado.
   * sempre que o usuário iniciar a aplicação
   */
  if (AuthService.isAuthenticated()) {
    AuthService.scheduleTokenRefresh();
  }
});
