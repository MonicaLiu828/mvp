const mongoose = require('mongoose');

/**
 * Restaurant schema
 */
const restaurantSchema = new mongoose.Schema({
  name: String,
  distance: Number,
  price: String,
  display_address: [String],
  image_url: String
});

/**
 * Restaurant model
 */
const Restaurants = mongoose.model('Restaurants', restaurantSchema);

/**
 * Create promised used to save the restaurant.
 * 
 * @param data restaurant info
 * @returns save promise 
 */
const save = function (data) {
  var restaurant = new Restaurants(data);
  return restaurant.save();
}

/**
 * Find all visited restaurants in database.
 * 
 * @returns all databases 
 */
const getAll = () => {
  return Restaurants.find().exec();
}

module.exports.save = save;
module.exports.getAll = getAll;