angular.module("todoApp").filter("brDate", function () {
  return function (dateStr) {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };
});

angular.module("todoApp").filter("brDateTime", function () {
  return function (input) {
    if (!input) return "";

    const date = new Date(input);

    if (isNaN(date)) return "";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  };
});
