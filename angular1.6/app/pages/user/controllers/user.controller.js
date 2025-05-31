angular
  .module("todoApp")
  .controller("UserController", function ($scope, AuthService) {
    $scope.userInfo = null;
    $scope.loading = true;

    AuthService.me().then((response) => {
      $scope.loading = false;
      $scope.userInfo = response.data;
    });
  });
