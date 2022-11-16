require("dotenv").config();
const express = require('express');
const app = express();
const db = require('../dbs/index.js');
const model = require('../dbs/model/model.js')
const yelpHelper = require('./controller.js')
app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

app.get('/restaurants', (req, res) => {
  model.getAll()
  .then((response) => {
    res.send(response);
  })
  .catch((err) => {
    res.send(err);
  })
})

app.post('/restaurants', (req, res) => {
  console.log('req body',req.query)
  model.save(req.query)
  .then((response) => {
    res.send('add request succeed')
  })
  .catch((err) => {
    res.send(err)
  })
})

app.get('/yelp', (req, res) => {
  console.log('req body',req.query)

  var randomBusiness = (arr) => {
    if (arr.length <= 4) {
      return arr;
    }
    var count = 0;
    var stoArr = [];
    var resArr = [];
    while (count <= 3) {
      var ranNum = parseInt(Math.random() * (arr.length-1))
      if(stoArr.indexOf(ranNum) < 0){
        stoArr.push(ranNum)
        resArr.push(arr[ranNum])
        count ++
      }
    }
    return resArr
  }

  yelpHelper.getAllRes(req.query)
  .then((response) => {
    // console.log('data', reponse.data)
    if (response.data.businesses.length === 0) {
      console.log("cannot find with current condition, enlarge the condition")
      var largeCondition = {
        location: req.query.location
      }
      yelpHelper.getAllRes(largeCondition)
      .then((response) => {
        res.send({businesses: randomBusiness(response.data.businesses), found: false})
      })
      .catch((err) => {
        res.send(err);
      })
    } else {
      res.send({businesses: randomBusiness(response.data.businesses), found: true});
    }

    // res.send(response);
  })
  .catch((err) => {
    res.send(err);
  })
})

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);