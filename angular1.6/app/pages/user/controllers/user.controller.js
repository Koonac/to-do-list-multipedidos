angular
  .module("todoApp")
  .controller("UserController", function ($scope, AuthService) {
    $scope.userInfo = null;

    AuthService.me().then((response) => {
      $scope.userInfo = response.data;
    });
  });
