angular.module("swagShop").component("swag", {
  templateUrl: "./app/swag/swag.template.html",
  controller: function swagComponent() {},
  bindings: {
    item: "<",
    action: "&",
    actionLabel: "@"
  },
  controllerAs: "swagCtrl"
});
