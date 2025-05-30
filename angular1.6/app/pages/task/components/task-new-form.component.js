angular.module("todoApp").component("taskNewForm", {
  templateUrl: "app/pages/task/task-new-form.template.html",
  bindings: {
    loadTasks: "&",
  },
  controller: function (TaskService) {
    this.error = "";
    this.newTask = {};

    this.addTask = function () {
      this.error = "";
      if (!this.newTask.title && !this.newTask.due_date) return;

      const data = {
        title: this.newTask.title,
        description: this.newTask.description,
        due_date: new Date(this.newTask.due_date).toISOString().split("T")[0],
      };

      TaskService.create(data)
        .then(() => {
          this.newTask = {};
          this.loadTasks();
        })
        .catch((err) => {
          this.error = err.data.message ?? err.data;
          console.error(err);
        });
    };
  },
});
