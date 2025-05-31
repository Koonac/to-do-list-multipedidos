angular
  .module("todoApp")
  .controller(
    "LoginController",
    function ($scope, $location, AuthService) {
      $scope.formLogin = {
        email: "",
        password: "",
      };

      $scope.redirecionar = function (page) {
        $location.path(page ?? "/");
      };

      $scope.login = function () {
        $scope.error = "";
        AuthService.login($scope.formLogin)
          .then(() => {
            $location.path("/tarefas");
          })
          .catch(() => {
            $scope.error = "Usuário ou senha inválidos.";
          });
      };
    }
  );
