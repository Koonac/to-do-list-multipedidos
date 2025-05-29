angular.module("todoApp").component("homeList", {
  templateUrl: "app/pages/home/home-list.template.html",
  controller: function () {
    this.message = "Interando lista";
    this.itens = [
      { id: 1, nome: "Item 1" },
      { id: 2, nome: "Item 2" },
    ];
  },
  // Permite colocar conteudo html dentro 
  transclude: true,
  // Capturando par6ametro passado para o componente
  bindings: {
    messagePai: "<",
  },
});
