angular.module("swagShop").component("detailsComponent", {
  templateUrl: "./app/details/details.template.html",
  controller: function detailsCtrl($state, swagSrvc, cartSrvc) {
    this.item = swagSrvc.swag.find(cur => cur.id == $state.params.id);
    this.addToCart = item => {
      cartSrvc.add(item);
    };
  },
  bindings: {},
  controllerAs: "detailsCtrl"
});
