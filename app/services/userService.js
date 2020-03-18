app.service("userService", function() {
  this.getUsers = function() {
    return users;
  };

  this.insertUser = function(name, email, phone, address) {
    var userID = users.length + 1;
    users.push({
      id: userID,
      name: name,
      email: email,
      phone: phone,
      address: address
    });
  };

  this.deleteUser = function(id) {
    for (var i = users.length - 1; i >= 0; i--) {
      if (users[i].id === id) {
        users.splice(i, 1);
        break;
      }
    }
  };

  this.getUser = function(id) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        return users[i];
      }
    }
    return null;
  };

  var users = [
    {
      id: 1,
      name: "David",
      email: "david@dassa.com",
      phone: "+4342324332",
      address: [
        { id: 1, country: "USA", city: "Miami", street: "Florida" },
        { id: 2, country: "USA", city: "New York", street: "Now York" },
        { id: 3, country: "USA", city: "Las Vegas", street: "Las Vegas" }
      ]
    },
    {
      id: 2,
      name: "Sarah",
      email: "sarah@dassa.com",
      phone: "+43423245454",
      address: [
        { id: 1, country: "Canada", city: "Toronto", street: "Ontario" },
        { id: 2, country: "Canada", city: "Motreal", street: "Ontario" }
      ]
    }
  ];
});
