angular
  .module("todoApp")
  .controller("LoginController", function ($scope, $location, AuthService) {
    $scope.credentials = {
      email: "",
      password: "",
    };

    $scope.login = function () {
      $scope.error = "";
      AuthService.login($scope.credentials)
        .then(() => {
          $location.path("/tarefas");
        })
        .catch(() => {
          $scope.error = "Usuário ou senha inválidos.";
        });
    };
  });
