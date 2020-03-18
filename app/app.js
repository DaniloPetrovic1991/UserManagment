var app = angular.module("userManagment", ["ngRoute", 'ngStorage']);

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
      .when("useraddress/:id", {
        templateUrl: "app/views/userAddress.html",
        controller: "UsersController"
      })
      .when("/address", {
        templateUrl: "app/views/address.html",
        controller: "UsersController"
      })
      .otherwise({
        redirectTo: "/home"
      });
  }
]);

app.controller("UsersController", function($scope, $location, $localStorage, userService) {
  
  init();

  function init() {
    $scope.users = userService.getUsers();
    $localStorage.users = $scope.users;
  }

  $scope.insertUser = function() {
    
    var name = $scope.newUser.name;
    var email = $scope.newUser.email;
    var phone = $scope.newUser.phone;
    var address = $scope.newUser.address;
    userService.insertUser(name, email, phone, address);
    $scope.newUser.name = '';
    $scope.newUser.email = '';
    $scope.newUser.phone = '';
    $scope.newUser.address = '';

    console.log($scope.users);

    $scope.users = $localStorage.users;

    $location.path("/home.html");
  };

  $scope.editUser = function(users) {
    $scope.editUserInfo = true;
    $scope.newUser = users;
    console.log(users);
  };

  $scope.saveUserEdit = function() {
    $scope.newUser = {};
    $scope.editUserInfo = false;
  };

  $scope.deleteUser = function(id) {
    userService.deleteUser(id)
  };
});


app.controller("AddressController", function(
  $scope,
  $location,
  addressService
) {
  $scope.addresses = [];

  init();

  function init() {
    $scope.addresses = addressService.getAddress();
  }

  $scope.addAddress = function() {
    $scope.addresses.push({
      country: $scope.newAddress.country,
      city: $scope.newAddress.city,
      street: $scope.newAddress.street
    });
    $location.path("/home.html");
  };

  $scope.editAddress = function(addresses) {
    $scope.editAddressInfo = true;
    $scope.newAddress = addresses;
  };

  $scope.saveAddressEdit = function() {
    $scope.newAddress = {};
    $scope.editAddressInfo = false;
  };

  $scope.deleteAddress = function(id) {
    addressService.deleteAddress(id);
  };
});


app.controller("UserAddressController", function(
  $scope,
  $routeParams,
  userService
) {
  init();

  function init() {
    var id = $routeParams.id ? parseInt($routeParams.id) : 0;
    if (id > 0) {
      $scope.id = userService.getUsers(id);
    }
  }
});
