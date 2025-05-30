angular
  .module("todoApp")
  .controller(
    "TaskController",
    function ($scope, TaskService, AuthService, $location, $http) {
      if (!AuthService.isAuthenticated()) {
        $location.path("/");
        return;
      }

      $scope.error = "";
      $scope.loading = false;
      $scope.filter = 'all';
      $scope.tasks = [];
      $scope.newTask = {};
      $scope.editingTask = null;

      $scope.loadTasks = function () {
        $scope.loading = true;
        TaskService.all()
          .then((res) => {
            $scope.loading = false;
            $scope.tasks = res.data;
          })
          .catch((err) => {
            $scope.loading = false;
          });
      };

      $scope.addTask = function ($event) {
        if (!$scope.newTask.title && !$scope.newTask.due_date) return;
        const data = {
          title: $scope.newTask.title,
          description: $scope.newTask.description,
          due_date: new Date($scope.newTask.due_date)
            .toISOString()
            .split("T")[0],
        };

        TaskService.create(data)
          .then(() => {
            $scope.newTask = {};
            $scope.loadTasks();
          })
          .catch((err) => {
            $scope.error = err.data.message ?? err.data;
            console.error(err);
          });
      };

      $scope.editTask = function (task) {
        $scope.editingTask = angular.copy(task);
      };

      $scope.updateTask = function () {
        if (!$scope.editingTask.title) return;
        TaskService.update($scope.editingTask.id, $scope.editingTask).then(
          () => {
            $scope.editingTask = null;
            $scope.loadTasks();
          }
        );
      };

      $scope.cancelEdit = function () {
        $scope.editingTask = null;
      };

      $scope.deleteTask = function (id) {
        TaskService.delete(id).then(() => {
          $scope.loadTasks();
        });
      };

      $scope.loadTasks();
    }
  );
