angular
  .module("todoApp")
  .controller(
    "LayoutController",
    function ($location, $rootScope, AuthService) {
      const lc = this;

      lc.isLoginPage = $location.path() === "/";
      lc.path = $location.path();
      lc.hideMenu = true;

      lc.toggleHideMenu = function () {
        lc.hideMenu = !lc.hideMenu;
      };

      $rootScope.$on("$routeChangeSuccess", function () {
        lc.path = $location.path();
        lc.isLoginPage = $location.path() === "/";
      });

      lc.redirecionar = function (page) {
        $location.path(page ?? "/");
      };

      lc.logout = function () {
        AuthService.logout();
        $location.path("/");
      };
    }
  );
