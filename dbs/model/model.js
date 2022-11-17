const mongoose = require('mongoose');

let businessSchema = new mongoose.Schema({
  name: String,
  distance: Number,
  price: String,
  display_address: [String],
  image_url: String
});

const Restaurants = mongoose.model('Restaurants', businessSchema);

const save = function (data) {
  var restaurant = new Restaurants(data)
  return restaurant.save()
}

const getAll = () => {
  return Restaurants.find().exec()
}

module.exports.save = save;
module.exports.getAll = getAll;