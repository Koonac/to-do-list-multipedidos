angular.module("todoApp").component("taskCard", {
  templateUrl: "app/pages/task/task-card.template.html",
  bindings: {
    editTask: "&",
    task: "<",
  },
  controller: function (TaskService) {
    this.toggleDone = function () {
      this.task.is_done = !this.task.is_done;
      TaskService.update(this.task.id, {
        is_done: this.task.is_done,
      }).then(() => {
      });
    };

    this.deleteTask = function () {
      TaskService.delete(this.task.id).then(() => {
        this.loadTasks();
      });
    };
  },
});
