angular.module("todoApp").component("taskCard", {
  templateUrl: "app/pages/task/task-card.template.html",
  bindings: {
    task: "<",
  },
  controller: function ($scope, TaskService) {
    this.toggleDone = function (task) {
      TaskService.update(task.id, {
        is_done: !task.is_done,
      }).then(() => {
        // $scope.loadTasks();
      });
    };
  },
});
