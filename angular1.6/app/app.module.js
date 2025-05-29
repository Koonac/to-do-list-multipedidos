angular.module("todoApp", ["ngRoute"]).config(function ($httpProvider) {
  $httpProvider.interceptors.push("AuthInterceptor");
});
