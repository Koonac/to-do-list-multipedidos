angular.module("todoApp").component("taskEditForm", {
  templateUrl: "app/pages/task/task-edit-form.template.html",
  bindings: {
    editingTask: "<",
    cancelEdit: "&",
    loadTasks: "&",
  },
  controller: function (TaskService, UtilsService) {
    this.error = "";

    this.updateTask = function () {
      this.error = "";
      if (
        !this.editingTask.id &&
        !this.editingTask.title &&
        !this.editingTask.due_date
      )
        return;

      const data = {
        title: this.editingTask.title,
        description: this.editingTask.description,
        due_date: UtilsService.formatDateTimeToDate(this.editingTask.due_date),
      };

      TaskService.update(this.editingTask.id, data)
        .then(() => {
          this.cancelEdit();
          this.loadTasks();
        })
        .catch((err) => {
          this.error = err.data.message ?? err.data;
        });
    };
  },
});
