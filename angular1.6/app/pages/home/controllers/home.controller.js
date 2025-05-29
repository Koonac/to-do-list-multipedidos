angular.module("todoApp").controller("HomeController", function ($scope) {
  this.title = "Bem-vindo à Home com controller separado!";
  this.message = "Olá mundo";

  this.infos = { nome: "henrique" };
});
