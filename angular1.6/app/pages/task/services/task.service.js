angular.module("todoApp").factory("TaskService", function ($http) {
  const baseUrl = "http://localhost:8000/api/tasks";

  return {
    all: () => $http.get(baseUrl),
    find: (id) => $http.get(`${baseUrl}/${id}`),
    create: (task) => $http.post(baseUrl, task),
    update: (id, task) => $http.put(`${baseUrl}/${id}`, task),
    delete: (id) => $http.delete(`${baseUrl}/${id}`),
  };
});
