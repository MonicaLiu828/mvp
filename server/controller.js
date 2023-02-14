require("dotenv").config();

const axios = require ('axios');
const model = require('../dbs/model/model.js');

/**
 * Get restaurants that satisfy the condition passed in.
 * 
 * @param {object} conditions 
 * @returns result restaurants
 */
var getAllRes = function(conditions) {
  const options = {
    method: 'get',
    url: 'https://api.yelp.com/v3/businesses/search',
    headers: {
      'Authorization': 'Bearer ' + process.env.token
    },
    params: conditions
  };
  console.log('Built options based on conditions:', JSON.stringify(options));
  
  return axios.request(options);
}

/**
 * Get all restaurant that has been marked as visited by user.
 * 
 * @param {Request} req request 
 * @param {Response} res response
 */
var getVisitedRestaurant = (req, res) => {
  console.log('Client request all visited restaurant.');
  model.getAll()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.error(`Failed to get all restaurants.`, err);
      res.status(500).Requestsend(err);
    });
}

/**
 * Save restaurant as visited for user. 
 * 
 * @param {Request} req request contain the info of visited restaurant
 * @param {Response} res save response
 */
var saveVisitedRestaurant = (req, res) => {
  // validate request
  console.log('Client request to save restaurant as visited.');
  if (req.query === null) {
    res.status(400).send('Request missing restaurant infomation!');
  }

  // save the item
  const visitedRestaurant = req.query;
  model.save(visitedRestaurant)
    .then((response) => {
      res.status(201).send(`${JSON.stringify(visitedRestaurant)} has been saved as visited.`);
    })
    .catch((err) => {
      console.error(`${visitedRestaurant} failed to be saved.`, err);
      res.status(500).send(err);
    })
}

/**
 * Private method to generate random selection of restaurant from an array.
 *  
 * @param {Array} arr array of source restaurants 
 * @returns random selected restaurants
 */
var randomBusiness = (arr) => {
  if (arr.length <= 4) {
    return arr;
  }
  var seen = [];
  var resArr = [];
  while (resArr.length <= 3) {
    var ranNum = parseInt(Math.random() * (arr.length-1))
    if(seen.indexOf(ranNum) < 0){
      seen.push(ranNum)
      resArr.push(arr[ranNum])
    }
  }
  return resArr
}

/**
 * Get restaurants from Yelp fusion API and return randomized results generated
 * from it. Steps as follows:
 * - Get user filter condition from request
 * - Call Yelp fusion API with above condition to get all the restaurants
 * - Call randomize method to generate a result of 4 random restaurants  
 * 
 * @param {Request} req request conatins user filter conditions
 * @param {Response} res response contains at most 4 random restaurants, and a flag
 *                       of whether found results based on original conditions
 */
var getRestaurantFromYelp = (req, res) => {
  // validate request
  console.log('Client request to get random restaurant with condition.');
  if (req.query === null || req.query.location === null) {
    res.status(400).send('Request missing restaurant infomation!');
  }
  
  // get from Yelp
  const conditions = req.query;
  yelpHelper.getAllRes(conditions)
    .then((response) => {
      const yelpResult = response.data.businesses;
      if (yelpResult.length === 0) {
        // can't find any result with all conditions
        console.log("Cannot find with current condition, enlarge the condition");
        var largeCondition = {
          location: conditions.location
        };
        yelpHelper.getAllRes(largeCondition)
          .then((response) => {
            res.send({businesses: randomBusiness(yelpResult), found: false});
          })
          .catch((err) => {
            console.error(`Failed during retrieve results from yelp.`, err);
            res.status(500).send(err);
          })
      } else {
        res.send({businesses: randomBusiness(yelpResult), found: true});
      }
    })
    .catch((err) => {
      console.error(`Failed to get restaurants with conditions ${JSON.stringify(conditions)}.`, err);
      res.status(500).send(err);
    });
}

module.exports.getVisitedRestaurant = getVisitedRestaurant;
module.exports.saveVisitedRestaurant = saveVisitedRestaurant; 
module.exports.getRestaurantFromYelp = getRestaurantFromYelp;