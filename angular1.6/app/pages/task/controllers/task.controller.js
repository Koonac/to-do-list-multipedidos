angular
  .module("todoApp")
  .controller(
    "TaskController",
    function ($scope, TaskService, AuthService, $location) {
      if (!AuthService.isAuthenticated()) {
        $location.path("/");
        return;
      }

      $scope.loading = false;
      $scope.filter = "in_progress";
      $scope.tasks = [];
      $scope.editingTask = null;

      $scope.loadTasks = function (filter = "in_progress") {
        $scope.loading = true;
        $scope.filter = filter;
        TaskService.list(filter)
          .then((res) => {
            $scope.loading = false;
            $scope.tasks = res.data;
          })
          .catch((err) => {
            $scope.loading = false;
          });
      };

      $scope.editTask = function (task) {
        $scope.editingTask = angular.copy(task);
      };

      $scope.cancelEdit = function () {
        $scope.editingTask = null;
      };

      $scope.loadTasks("in_progress");
    }
  );
