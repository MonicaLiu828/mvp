const express = require('express');
const router = express.Router();
const controllers = require('./controller.js');

/**
 * Get API endpoints 
 */
router.get('/restaurants', controllers.getVisitedRestaurant);
router.get('/yelp', controllers.getRestaurantFromYelp);

/**
 * Post API endpoints
 */
router.post('/restaurants', controllers.saveVisitedRestaurant);

module.exports = router;