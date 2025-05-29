angular
  .module("todoApp")
  .factory("AuthService", function ($http, $window, $q, $timeout) {
    /**
     * URL base para consulta de atutenticação
     * @var {string} baseUrl
     */
    const baseUrl = "http://localhost:8000/api/auth";
    let refreshTimer = null;

    /**
     * Salva o token JWT no localStorage.
     * @param {string} token
     * @param {int} expiresIn
     */
    function saveToken(token, expiresIn) {
      $window.localStorage.setItem("jwt_token", token);
      const expirationTime = Date.now() + expiresIn * 1000;
      $window.localStorage.setItem("jwt_exp", expirationTime.toString());

      scheduleTokenRefresh();
    }

    /**
     * Recupera o token JWT do localStorage.
     * @returns {string|null}.
     */
    function getToken() {
      return $window.localStorage.getItem("jwt_token");
    }

    /**
     * Recupera a expiração do token JWT no localStorage.
     * @returns {int}.
     */
    function getTokenExpiration() {
      return parseInt($window.localStorage.getItem("jwt_exp") || "0", 10);
    }

    /**
     * Remove o token JWT do localStorage
     */
    function removeToken() {
      $window.localStorage.removeItem("jwt_token");
      $window.localStorage.removeItem("jwt_exp");
      cancelScheduledRefresh();
    }

    /**
     * Verifica se o usuário está autenticado
     * @returns {boolean}
     */
    function isAuthenticated() {
      const token = getToken();
      const exp = getTokenExpiration();
      return Boolean(token) && Date.now() < exp;
    }

    /**
     * Realiza o login do usuário
     * @param {object} credentials
     * @returns {Promise}
     */
    function login(credentials) {
      return $http
        .post(`${baseUrl}/login`, credentials)
        .then((res) => {
          saveToken(res.data.access_token, res.data.expires_in);
        })
        .catch((err) => {
          console.error(err);
          return $q.reject(err);
        });
    }

    /**
     * Realiza o logout do usuário
     */
    function logout() {
      removeToken();
    }

    /**
     * Atualiza o token JWT
     * @returns {Promise}
     */
    function refreshToken() {
      return $http
        .post(
          `${baseUrl}/refresh`,
          {},
          {
            headers: { Authorization: "Bearer " + getToken() },
          }
        )
        .then((res) => {
          saveToken(res.data.access_token, res.data.expires_in);
        })
        .catch((err) => {
          removeToken();
          return $q.reject(err);
        });
    }

    /**
     * Agenda o token refresh
     */
    function scheduleTokenRefresh() {
      cancelScheduledRefresh(); // cancela se já tinha um agendamento

      const exp = getTokenExpiration();
      const now = Date.now();
      const minBeforeExp = 5 * 60 * 1000; // 5 minutos antes do expirar
      const timeUntilRefresh = exp - now - minBeforeExp;

      console.log(
        "scheduleTokenRefresh" + exp,
        now,
        minBeforeExp,
        timeUntilRefresh
      );

      if (timeUntilRefresh > 0) {
        refreshTimer = $timeout(() => {
          refreshToken();
        }, timeUntilRefresh);
      }
    }

    /**
     * Cancela o agendamento do token refresh
     */
    function cancelScheduledRefresh() {
      if (refreshTimer) {
        $timeout.cancel(refreshTimer);
        refreshTimer = null;
      }
    }

    // Quando o serviço iniciar, agenda um refresh se o token for válido
    if (isAuthenticated()) {
      // scheduleTokenRefresh();
    }

    return {
      getToken,
      isAuthenticated,
      login,
      logout,
      refreshToken,
    };
  });
