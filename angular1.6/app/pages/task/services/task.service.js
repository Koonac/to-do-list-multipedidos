angular.module("todoApp").factory("TaskService", function ($http) {
  const baseUrl = "http://localhost:8000/api/tasks";

  function list(filter) {
    let params = null;

    switch (filter) {
      case "in_progress":
        params = {
          isDone: 0,
        };
        break;
      case "completed":
        params = {
          isDone: 1,
        };
        break;
    }

    return $http.get(baseUrl, {
      params,
    });
  }

  return {
    list,
    find: (id) => $http.get(`${baseUrl}/${id}`),
    create: (task) => $http.post(baseUrl, task),
    update: (id, task) => $http.put(`${baseUrl}/${id}`, task),
    delete: (id) => $http.delete(`${baseUrl}/${id}`),
  };
});
