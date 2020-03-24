var app = angular.module("userManagment", ["ngRoute", "ngStorage"]);

app.config([
  "$routeProvider",
  function($routeProvider) {
    $routeProvider
      .when("/home", {
        templateUrl: "app/views/home.html"
      })
      .when("/user", {
        templateUrl: "app/views/user.html",
        controller: "UsersController"
      })
      .when("/user/:id/address", {
        templateUrl: "app/views/userAddress.html",
        controller: "UserAddressController"
      })
      .otherwise({
        redirectTo: "/home"
      });
  }
]);

app.controller("UsersController", function(
  $scope,
  $location,
  $localStorage,
  userService
) {
  init();

  function init() {
    $scope.users = userService.getUsers();
    $localStorage.users = $scope.users;
  }

  $scope.insertUser = function() {

    var name = $scope.newUser.name;
    var email = $scope.newUser.email;
    var phone = $scope.newUser.phone;
    userService.insertUser(name, email, phone);
    $scope.newUser.name = "";
    $scope.newUser.email = "";
    $scope.newUser.phone = "";

    console.log($scope.users);
    
    $scope.users = $localStorage.users;

    $location.path("/home.html");


  };

  $scope.editUser = function(user) { 
      $scope.editUserInfo = true; 
      userService.editUser(user);

  };

  $scope.saveUserEdit = function() {
    $scope.newUser = {};
    $scope.editUserInfo = false;
  };

  $scope.deleteUser = function(id) {
    userService.deleteUser(id);
  };
});

app.controller("AddressController", function($scope, $location, userService) {
  $scope.addresses = [];

  init();

  function init() {
    $scope.addresses = userService.getAddress();
  }
});

app.controller("UserAddressController", function(
  $scope,
  $routeParams,
  userService,
  addressService
) {
  init();

  function init() {
    var id = $routeParams.id ? parseInt($routeParams.id) : 0;
    if (id > 0) {
      $scope.user = userService.getUser(id);
    }
    $scope.id = id;
    $scope.editAddressInfo = false;
  }

  $scope.editAddress = function(addresses) {
    $scope.editAddressInfo = true;
    $scope.newAddress = addresses;
  };

  $scope.addAddress = function() {
    $scope.user.address.push({
      country: $scope.user.address.country,
      city: $scope.user.address.city,
      street: $scope.user.address.street
    });
  };

  $scope.saveAddressEdit = function() {
    $scope.newAddress = {};
    $scope.editAddressInfo = false;
  };

  $scope.deleteAddress = function(id) {
    addressService.deleteAddress(id);
  };

  $scope.isChecked = function(entity) {
    return $scope.checkedEntity === entity;
  };

  $scope.toggleSelection = function(entity) {
    entity.checked = !entity.checked;
    if (entity.checked) {
      $scope.checkedEntity = entity;
    } else {
      $scope.checkedEntity = null;
    }
  };
});
