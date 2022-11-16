require("dotenv").config();
const axios = require ('axios');

var getAllRes = function(conditions) {
  const options = {
    method: 'get',
    url: 'https://api.yelp.com/v3/businesses/search',
    headers: {
      'Authorization': 'Bearer ' + process.env.token
    },
    params: conditions
    // {
    //   location: request.location,
    //   price: request.price,
    //   categories: request.categories,
    //   radius: request.radius
    // }
  };
  console.log('option', options)
  var promise = axios.request(options);
  return promise;
}

module.exports.getAllRes = getAllRes;

