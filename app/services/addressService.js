app.service('addressService', function(){
    this.getAddress = function() {
      return addresses;
    }
  
    this.insertAddress = function(country, city, street) {
      var addressID = addresses.length + 1;
      addresses.push({
        id: addressID,
        country: country,
        city: city,
        street: street,
      });
    };
  
    this.deleteAddress = function(id) {
      for(var i = addresses.length -1; i >= 0; i--){
        if(addresses[i].id === id){
          addresses.splice(i,1);
          break;
        }
      }
    };
  
    this.getAddress = function(id) {
      for(var i =0; i< addresses.length; i++){
        if(addresses[i].id === id) {
          return addresses[i];
        }
      }
      return null;
    };
  

  });
  