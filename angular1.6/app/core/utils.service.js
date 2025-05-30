angular.module("todoApp").service("UtilsService", function () {
  this.formatDateTimeToDate = function (dateTime) {
    return new Date(dateTime).toISOString().split("T")[0];
  };

  this.formatDateToDateTime = function (date) {
    return new Date(date + "T00:00:00");
  };
});

