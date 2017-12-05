angular.module("swagShop").component("list", {
  templateUrl: "./app/list/list.template.html",
  controller: function swagComponent(swagSrvc, $state) {
    this.swag = swagSrvc.swag;
    this.goToDetails = function(id) {
      console.log("id: ", id);
      $state.go("details", { id: id });
    };
  },
  bindings: {},
  controllerAs: "listCtrl"
});
