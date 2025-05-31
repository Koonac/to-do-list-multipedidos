angular
  .module("todoApp")
  .controller("RegisterController", function ($scope, $location, AuthService) {
    $scope.formRegister = {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    };

    $scope.redirecionar = function (page) {
      $location.path(page ?? "/");
    };

    $scope.register = function () {
      $scope.error = "";

      if (
        $scope.formRegister.password !==
        $scope.formRegister.password_confirmation
      ) {
        $scope.error = "As senhas não são iguais. Tente novamente.";
      }

      AuthService.register($scope.formRegister)
        .then(() => {
          $location.path("/tarefas");
        })
        .catch((err) => {
          // console.error(err);
          $scope.error = "Não foi possível realizar o cadastro.";
        });
    };
  });
