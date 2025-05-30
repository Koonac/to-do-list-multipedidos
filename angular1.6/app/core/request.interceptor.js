/**
 * O interceptor intercepta todas as requisições e respostas HTTP da sua aplicação AngularJS.
 *
 * @function request - Essa função é executada antes de cada requisição.
 * - Recupera o token do AuthService.
 * - Se houver token, adiciona o cabeçalho da requisição.
 *
 * @function responseError - Essa função é chamada quando ocorre um erro na resposta da API.
 * - Se a resposta é 401 (não autorizado) e não é uma requisição de retry, ele tenta:
 *  - Chamar AuthService.refreshToken().
 *  - Se der certo, refaz a requisição original ($http(response.config)).
 *  - Se falhar, faz logout e redireciona para /login.
 */
angular
  .module("todoApp")
  .factory("RequestInterceptor", function ($q, $injector) {
    return {
      request: function (config) {
        const AuthService = $injector.get("AuthService");
        const token = AuthService.getToken();
        if (token) {
          config.headers["Authorization"] = "Bearer " + token;
        }
        config.headers["Accept"] = "application/json";
        return config;
      },

      responseError: function (response) {
        const AuthService = $injector.get("AuthService");
        const token = AuthService.getToken();
        const $http = $injector.get("$http");
        const $location = $injector.get("$location");

        if (
          response.status === 401 &&
          !response.config.__isRetryRequest &&
          Boolean(token)
        ) {
          console.log("[RequestInterceptor] ERRO SUPREMO");
          return AuthService.refreshToken()
            .then(() => {
              response.config.__isRetryRequest = true;
              console.log("[RequestInterceptor] SUCESSO");
              return $http(response.config); // retry original request
            })
            .catch(() => {
              console.log("[RequestInterceptor] ERRORR");
              AuthService.logout();
              $location.path("/");
              return $q.reject(response);
            });
        }

        return $q.reject(response);
      },
    };
  });
