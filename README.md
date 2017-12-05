In this step, we'll complete the template for the `details.template.html` and
link the details component using a `script` tag in `index.html`.

We won't be able to visually test that `addToCart` is working correctly.
However, if you want to test it by using the `console` you can add a
`console.log( cartSrvc.currentCart() );` at the end of the method.

### Instructions

* Open `app/details/details.template.html`.
* Update the commented out sections to use the correct property from a `swag
  object`.
  * Hint: remember we bound the swag object on the controller property called
    `item`.
* Update the button at the bottom of the template to use the `addToCart` method.
  * Hint: What properties are on the `item` object?
* Open `index.html`.
* Add a new `script` tag for the `details` component.

<details>

<summary> Detailed Instructions </summary>

<br />

Let's begin by opening `app/details/details.template.html`. Remember that in the
previous step, we assigned the swag object we need onto `this.item`. This means
we can access that object by using `detailsCtrl.item`. We already know what
properties are on a swag object so this part becomes pretty easy. We also need
to update the `ng-click` to call our method `addToCart` with the `item` as an
argument.

```html
<div class="detailed__parent">
  <div class="detailed__child">
    <h4 class="detailed__header">Details</h4>
    <div class="detailed__content">
      <div class="detailed__content-header">
        <h4>{{ detailsCtrl.item.title }}</h4>
        <span>${{ detailsCtrl.item.price }}</span>
      </div>

      <div class="detailed__content-middle">
        <span>{{ detailsCtrl.item.size }}, {{ detailsCtrl.item.color }}</span>
      </div>

      <div class="detailed__content-footer">
        <button ng-click="detailsCtrl.addToCart( detailsCtrl.item )">add to cart</button>
      </div>
    </div>
  </div>
</div>
```

Then, just like we've done in the previous steps, we need to add a new `script
tag` in `index.html`.

```html
<!--Our Custom Script Files-->
<script src="app/app.js"></script>
<script src="app/services/swag.service.js"></script>
<script src="app/services/cart.service.js"></script>
<script src="app/swag/swag.component.js"></script>
<script src="app/list/list.component.js"></script>
<script src="app/details/details.component.js"></script>
```

</details>

### Solution

<details>

<summary> <code> app/details/details.template.html </code> </summary>

```html
<div class="detailed__parent">
  <div class="detailed__child">
    <h4 class="detailed__header">Details</h4>
    <div class="detailed__content">
      <div class="detailed__content-header">
        <h4>{{ detailsCtrl.item.title }}</h4>
        <span>${{ detailsCtrl.item.price }}</span>
      </div>

      <div class="detailed__content-middle">
        <span>{{ detailsCtrl.item.size }}, {{ detailsCtrl.item.color }}</span>
      </div>

      <div class="detailed__content-footer">
        <button ng-click="detailsCtrl.addToCart( detailsCtrl.item )">add to cart</button>
      </div>
    </div>
  </div>
</div>
```

</details>

<details>

<summary> <code> index.html ( script section only ) </code> </summary>

```html
<!--Our Custom Script Files-->
<script src="app/app.js"></script>
<script src="app/services/swag.service.js"></script>
<script src="app/services/cart.service.js"></script>
<script src="app/swag/swag.component.js"></script>
<script src="app/list/list.component.js"></script>
<script src="app/details/details.component.js"></script>
```

</details>

<br />

<img src="https://github.com/DevMountain/angular-3-afternoon/blob/solution/readme-assets/2g.gif" />

## Step 7

### Summary

In this step, we'll build out the cart component. The cart component is
responsible for displaying all swag that is currently in the cart or displaying
that the cart is empty. It will also provide a user with the option to checkout,
which in this case should empty the user's cart. This component will make use of
the swag component to display the swag that is in the cart.

Remember that the swag component's action and action label are dynamic. On the
cart view, we want the action to remove the swag from the cart and the label to
be `'remove'`.

### Instructions

* Open `app/cart/cart.component.js`.
* Create a skeleton of an Angular component.
  * Use `swagShop` as the application name.
  * Use `cart` as the component name.
* Link the template into the component and set the component's controller as
  `cartCtrl`.
* Create a controller function:
  * This function should have the cart service injected into it.
  * Assign an array called `cart` that equals the return of the `currentCart`
    method on the cart service.
  * Assign a method called `total`:
    * This method should calculate the total of all the swag in the cart and
      return the sum.
  * Assign a method called `checkout`:
    * This method should set the value of `cart` equal to the return of the
      `checkout` method on the cart service.
  * Assign a method called `removeItem`:
    * This method should have an `index` parameter ( the index of the swag in
      the cart array ).
    * This method should call the `remove` method on the cart service with
      `index` as an argument.

`removeItem` will act as the dynamic action that will be passed into the swag
component. We'll see this happen in the next step.

<details>

<summary> Detailed Instructions </summary>

<br />

Let's begin by opening `app/cart/cart.component.js` and create a component
skeleton.

```js
angular.module("swagShop").component("cart", {});
```

Just like we've done in the previous steps, let's link the template file, set
the controller name as `cartCtrl`, and also create a controller function. This
controller function should have the cart service injected into it.

```js
angular.module("swagShop").component("cart", {
  templateUrl: "app/cart/cart.template.html",
  controllerAs: "cartCtrl",

  controller: function(cartSrvc) {}
});
```

This component will be responbile for displaying and updating the cart. We'll
want to provide our template access to the cart, the cart's total, and all of
the available methods in the cart service. It might help if you have the cart
service open ( `app/services/cart.service.js` ) to see the methods. Let's start
by assigning `cart` to the controller. `cart` should equal the current cart
array. We can get that value by calling the `currentCart` method in the cart
service.

```js
angular.module("swagShop").component("cart", {
  templateUrl: "app/cart/cart.template.html",
  controllerAs: "cartCtrl",

  controller: function(cartSrvc) {
    this.cart = cartSrvc.currentCart();
  }
});
```

The next thing we'll need is a way to calculate the total. Let's assign a method
called `total` that returns the sum of the prices of the swag in the cart.

```js
angular.module("swagShop").component("cart", {
  templateUrl: "app/cart/cart.template.html",
  controllerAs: "cartCtrl",

  controller: function(cartSrvc) {
    this.cart = cartSrvc.currentCart();

    this.total = function() {
      return this.cart.reduce((total, current) => total + current.price, 0);
    };
  }
});
```

We'll then need a way for a user to checkout. When the `checkout` method is
called on the service, it returns an empty cart. Knowing this we can create
method on the controller that calls this method and sets its return value
`cart`.

```js
angular.module("swagShop").component("cart", {
  templateUrl: "app/cart/cart.template.html",
  controllerAs: "cartCtrl",

  controller: function(cartSrvc) {
    this.cart = cartSrvc.currentCart();

    this.total = function() {
      return this.cart.reduce((total, current) => total + current.price, 0);
    };

    this.checkout = function() {
      this.cart = cartSrvc.checkout();
    };
  }
});
```

The last thing we'll need is the dynamic action for when we `ng-repeat` over the
swag component in the next step. We'll need a method that can remove the swag
from the cart. If we take a look inside the cart service, the `remove` method is
expecting an `index`. So we'll need to have a parameter to capture the `index`.

```js
angular.module("swagShop").component("cart", {
  templateUrl: "app/cart/cart.template.html",
  controllerAs: "cartCtrl",

  controller: function(cartSrvc) {
    this.cart = cartSrvc.currentCart();

    this.total = function() {
      return this.cart.reduce((total, current) => total + current.price, 0);
    };

    this.checkout = function() {
      this.cart = cartSrvc.checkout();
    };

    this.removeItem = function(index) {
      cartSrvc.remove(index);
    };
  }
});
```

</details>

### Solution

<details>

<summary> <code> app/cart/cart.component.js </code> </summary>

```js
angular.module("swagShop").component("cart", {
  templateUrl: "app/cart/cart.template.html",
  controllerAs: "cartCtrl",

  controller: function(cartSrvc) {
    this.cart = cartSrvc.currentCart();

    this.total = function() {
      return this.cart.reduce((total, current) => total + current.price, 0);
    };

    this.checkout = function() {
      this.cart = cartSrvc.checkout();
    };

    this.removeItem = function(index) {
      cartSrvc.remove(index);
    };
  }
});
```

</details>

## Step 8

### Summary

In this step, we'll complete the template for the `cart.template.html` and link
the cart component using a `script` tag in `index.html`.

### Instructions

* Open `app/cart/cart.template.html`.
* Update the `Total Here` comment to be the return of the `total` method.
* Locate the two empty `ng-if` statements:
  * The first `ng-if` should display the `div` if there is something in the
    cart.
  * The second `ng-if` should display the `div` if there is nothing in the cart.
* Locate the `Swag Here` comment:
  * Render the swag component and be sure to include all its necessary bindings.
  * The swag component should use an `ng-repeat` for every swag object in the
    cart.
    * This `ng-repeat` should also `track by` `$index`.
  * The action label should equal `'remove'` and remember to include the
    `$index` for the action's argument.
* Open `index.html`.
* Add a new `script` tag for the cart component.

<details>

<summary> Detailed Instructions </summary>

<br />

Let's begin by opening `app/cart/cart.template.html`. There are two empty
`ng-if` statements in this template. The first `ng-if` is responsible for
showing the `div` when there is at least one item in the cart. The second
`ng-if` is responsible for showing the `div` when there is nothing in the cart.
Remember that in the last step we assigned the cart to `cart`.

```html
<div ng-if="cartCtrl.cart.length > 0" class="cart__with-items">

</div>

<div ng-if="cartCtrl.cart.length === 0" class="cart__without-items">
  <span>Nothing in your cart</span>
</div>
```

The next thing we'll want to update is the total. Remember that the total is a
function, so we'll need to invoke it to get the value.

```html
<div class="cart__top-right">
  <span class="cart__total">Total: ${{ cartCtrl.total() }}</span>
  <button class="cart__btn-checkout" ng-click="">checkout</button>
</div>
```

The last thing we'll want to add is an `ng-repeat` over the swag component. This
will be just like how we've done it in the previous steps except we'll want to
track the `ng-repeat` by `$index`. This will allow us to use `$index` as the
argument for the `removeItem` method.

```html
<div class="cart__bottom">
  <swag
    ng-repeat="item in cartCtrl.cart track by $index"
    item="item"
    action="cartCtrl.removeItem($index)"
    action-label="remove">
  </swag>
</div>
```

Then, just like in the previous steps, we'll need to add the component as a new
`script tag` in `index.html`.

```html
<!--Our Custom Script Files-->
<script src="app/app.js"></script>
<script src="app/services/swag.service.js"></script>
<script src="app/services/cart.service.js"></script>
<script src="app/swag/swag.component.js"></script>
<script src="app/list/list.component.js"></script>
<script src="app/details/details.component.js"></script>
<script src="app/cart/cart.component.js"></script>
```

</details>

### Solution

<details>

<summary> <code> app/cart/cart.template.html </code> </summary>

```js
<div class="cart__parent">
  <div class="cart__child">
    <div ng-if="cartCtrl.cart.length > 0" class="cart__with-items">
      <div class="cart__top">
        <h4 class="cart__header">Cart</h4>
        <div class="cart__top-right">
          <span class="cart__total">Total: ${{ cartCtrl.total() }}</span>
          <button class="cart__btn-checkout" ng-click="cartCtrl.checkout()">checkout</button>
        </div>
      </div>

      <div class="cart__bottom">
        <swag
          ng-repeat="item in cartCtrl.cart track by $index"
          item="item"
          action="cartCtrl.removeItem($index)"
          action-label="remove">
        </swag>
      </div>
    </div>

    <div ng-if="cartCtrl.cart.length === 0" class="cart__without-items">
      <span>Nothing in your cart</span>
    </div>
  </div>
</div>
```

</details>

<details>

<summary> <code> index.html ( script section only ) </code> </summary>

```html
<!--Our Custom Script Files-->
<script src="app/app.js"></script>
<script src="app/services/swag.service.js"></script>
<script src="app/services/cart.service.js"></script>
<script src="app/swag/swag.component.js"></script>
<script src="app/list/list.component.js"></script>
<script src="app/details/details.component.js"></script>
<script src="app/cart/cart.component.js"></script>
```

</details>

<br />

<img src="https://github.com/DevMountain/angular-3-afternoon/blob/solution/readme-assets/3g.gif" />

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and
create a pull request so we can review your changes and merge them into the
master repo and branch.

## Copyright

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material
without express and written permission from DevMountain, LLC is strictly
prohibited. Excerpts and links may be used, provided that full and clear credit
is given to DevMountain with appropriate and specific direction to the original
content.

<p align="center">
<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
</p>
