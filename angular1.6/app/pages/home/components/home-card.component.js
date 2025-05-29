angular.module("todoApp").component("homeCard", {
  templateUrl: "app/pages/home/home-card.template.html",
  bindings: {
    list: "<",
  },
});
