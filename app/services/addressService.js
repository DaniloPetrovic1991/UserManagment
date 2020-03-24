
app.service("addressService", function() {

    this.getUsers = function() {
        return users;
      };

    this.getAddresses = function() {
        return users.address[id];
      }
    
      this.addAddress = function(country, city, street) {
        var addressID = users.address.length + 1;
        user.address.push({
          id: addressID,
          country: country,
          city: city,
          street: street,
        });
        newAddress = {};
      };
    
      this.deleteAddress = function(id) {
        for(var i = users.length - 1; i >= 0; i--){
          if(users[i].id === id) {
            users[i].address.splice(i,1);
            newAddress = {};
          }
        }
      };

});