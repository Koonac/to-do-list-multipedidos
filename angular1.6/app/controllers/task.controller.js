angular
  .module("todoApp")
  .controller(
    "TaskController",
    function ($scope, TaskService, AuthService, $location, $http) {
      if (!AuthService.isAuthenticated()) {
        $location.path("/login");
        return;
      }

      $scope.error = "";
      $scope.tasks = [];
      $scope.newTask = {};
      $scope.editingTask = null;

      function loadTasks() {
        TaskService.all().then((res) => {
          $scope.tasks = res.data;
        });
      }

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
            loadTasks();
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
            loadTasks();
          }
        );
      };

      $scope.cancelEdit = function () {
        $scope.editingTask = null;
      };

      $scope.deleteTask = function (id) {
        TaskService.remove(id).then(() => {
          loadTasks();
        });
      };

      $scope.toggleDone = function (task) {
        TaskService.update(task.id, {
          title: task.title,
          description: task.description,
          due_date: task.due_date,
          is_done: !task.is_done,
        }).then(() => {
          loadTasks();
        });
      };

      $scope.logout = function () {
        AuthService.logout();
        $location.path("/login");
      };

      loadTasks();
    }
  );
