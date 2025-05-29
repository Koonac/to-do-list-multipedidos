angular
  .module("todoApp")
  .controller("LoginController", function ($scope, $location, AuthService) {
    $scope.credentials = {
      email: "konac@outlook.com.br",
      password: "123456",
    };

    $scope.login = function () {
      AuthService.login($scope.credentials)
        .then(() => {
          $location.path("/tasks");
        })
        .catch(() => {
          $scope.error = "Usuário ou senha inválidos.";
        });
    };
  });
