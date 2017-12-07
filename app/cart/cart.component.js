angular.module("swagShop").component("cart", {
  templateUrl: "./app/cart/cart.template.html",
  controller: function(cartSrvc) {
    this.cart = cartSrvc.currentCart();
    this.total = () => this.cart.reduce((acc, cur) => acc + cur.price, 0);
    this.checkout = () => (this.cart = cartSrvc.checkout());
    this.removeItem = index => cartSrvc.remove(index);
  },
  bindings: {},
  controllerAs: "cartCtrl"
});
