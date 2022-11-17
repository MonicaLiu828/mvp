import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios';
import Price from './Price.jsx';
import Category from './Category.jsx';
import Radius from './Radius.jsx';
import Card from './Card.jsx';

import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Rating from '@mui/material/Rating';
import BusinessIcon from '@mui/icons-material/Business';
import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaymentsIcon from '@mui/icons-material/Payments';

import ResponsiveAppBar from './AppBar.jsx'


var ScrollArea = require('react-scrollbar');

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const App = () => {

  const [location, setLocation] = useState('')
  const [price, setPrice] = useState('price')
  const [category,setCategory] = useState('CATEGORY')
  const [radius, setRadius] = useState('RADIUS(METERS)')
  const [allRes, setAllRes] = useState([])
  const [found, setFound] = useState(true)
  const [displayRes, setDisplayRes] = useState([])
  const [isClick, setIsClick] = useState({})

  useEffect(() => {
    axios.get('/restaurants')
    .then((response) => {
      // console.log('test for visit again',response)
      setDisplayRes(response.data)
    })
    .catch((err) => {
      console.log(err)
    })
  },[])

  const handleOnClick = () => {
    var data = {
      location: location,
      price: price,
      categories: category,
      radius: radius
    }
    axios({
      method: 'get',
      url: '/yelp',
      params: data
    }).then((response) => {
      console.log('response is ', response.data)
      var status = {}
      response.data.businesses.forEach((each) => {
        status[each.name] = false;
      })
      setIsClick(status)
      setAllRes(response.data.businesses)
      setFound(response.data.found)
    })
    .catch((error) => {
      console.log(data)
      console.log(error)
    })
  }
  const handleVisit = (event,data) => {
    console.log('test for visit', data)
    axios({
      method: 'post',
      url: '/restaurants',
      params: data
    }).then((response) => {
      axios.get('/restaurants')
      .then((response) => {
        console.log(isClick)
        // console.log('test for visit again',response)
        setDisplayRes(response.data)
        console.log('event target',event.target )
        var newState =JSON.parse(JSON.stringify(isClick))
        newState[data.name] =true
        setIsClick(newState);
        event.target.disabled = true
      })
      .catch((err) => {
        console.log(err)
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  return(<div style={{
      backgroundColor: 'rgb(231, 235, 240)',
      // width: '100px',
      // height: '100px'
    }}>
    {/* <h1>WHAT'S EAT</h1> */}
    <ResponsiveAppBar></ResponsiveAppBar>
    <br />
    {/* <form>
      <label>location</label>
      <TextField label="Location" type="text" value={location} onChange={(event) => {setLocation(event.target.value)}} variant="outlined"></TextField>
    </form>
    <Price price={price} setPrice={setPrice}></Price>
    <Category category={category} setCategory={setCategory}></Category>
    <Radius radius= {radius} setRadius = {setRadius}></Radius> */}
    <div>
      {/* <button onClick={handleOnClick}>
        Submit!
      </button>
      <div>
        <div> The Restaurant you can pick:</div>
        <div>{found ? '' : 'We did not found restaurant based on your request, here are the suggestions for you'}</div>
        <br></br>
        <div>
       {Array.isArray(allRes)
        ? allRes.map(element => {
          return <div>
            {element.name}
            <br></br>
            {element['display_phone']}
            <br></br>
            {'rating '+ element.rating}
            <br></br>
            {element.location['display_address']}
            <button onClick={() => handleVisit({
              name: element.name,
              distance: element.distance,
              price: element.price,
              display_address: element.location['display_address']})}>click to visit</button>
            <br></br>
            <br></br>
          </div>;
          })
        : null}
       </div>
      </div>
      <div>
        <div> RESTAURANT VISITED</div>
        {displayRes && displayRes.map((each) => {
          return(
          // <div>

          <div>
            {each.name}
            {Math.floor(each.distance)}
            {each.price}
          </div>
          // </div>
          )
        })}
      </div> */}
      <Grid container spacing={2}>
        <Grid item md={4}>
          <Paper elevation={3}>
            <Item><h1>Navigation</h1></Item>
            <Item>
                <TextField label="Location" type="text" value={location} onChange={(event) => {setLocation(event.target.value)}} variant="outlined" />
            </Item>
            <Item>
              <Price price={price} setPrice={setPrice}></Price>
            </Item>
            <Item>
              <Category category={category} setCategory={setCategory}></Category>
            </Item>
            <Item>
              <Radius radius= {radius} setRadius = {setRadius}></Radius>
            </Item>
            <Item>
              <Button variant="contained" onClick={handleOnClick} color='success' endIcon={<RamenDiningIcon />}>What's eat?</Button>
            </Item>
          </Paper>
        </Grid>
        <Grid item md={4}>
          <Paper elevation={3}>
            <Item><h1>Random Restaurants</h1></Item>
            {/* <div>{found ? '' : 'The Restaurant you can pick:'}</div> */}
            <div>{found ? '' : 'We did not found restaurant based on your request, here are the suggestions for you'}</div>
            <Grid>
              {allRes.map(element => {
                return (<Item>
                    <Grid container>
                      <Grid item xs={6} md={5}>
                        <Item><img src={element.image_url} width='100%' height='100%'></img></Item>
                      </Grid>
                      <Grid item xs={6} md={7}>
                        <Item>
                          <h4>{element.name}</h4>
                          <LocalPhoneIcon />{element['display_phone']}
                          <br />
                          {'rating '+ element.rating}
                          <Rating name="half-rating-read" defaultValue={element.rating} precision={0.5} readOnly />
                          <br />
                          <BusinessIcon />{element.location['display_address']}
                          <br />
                          <Button variant="contained" onClick={(event) => handleVisit(event, {
                            name: element.name,
                            distance: element.distance,
                            price: element.price,
                            display_address: element.location['display_address'],
                            image_url: element['image_url']})} color={isClick[element.name]? 'success':'secondary'} endIcon={<CheckBoxIcon />}>{isClick[element.name]? 'visited':'Click to visit'}</Button>
                          {/* { isClick[element.name] &&  <Button variant="contained" onClick={(event) => handleVisit(event,{
                            name: element.name,
                            distance: element.distance,
                            price: element.price,
                            display_address: element.location['display_address'],
                            image_url: element['image_url']})} color='secondary' endIcon={<CheckBoxIcon />}>'visited'</Button>} */}
                        </Item>
                      </Grid>
                    </Grid>
                  </Item>
                )

                })
              }
            </Grid>
          </Paper>
        </Grid>
        <Grid item md={4} >
          {/* <div> */}
          <Paper elevation={3} style={{maxHeight: 750, overflow: 'auto'}}>
            <Item><h1>Restaurants visited</h1></Item>
            {displayRes.map((each) => {
              return(
              <Item >
                <h4>{each.name}</h4>
                <img src={each['image_url']} width='150px' height='150px'></img>
                <SocialDistanceIcon />{Math.floor(each.distance) + " meter" }&nbsp;&nbsp;&nbsp;&nbsp;
                <PaymentsIcon />{each.price}&nbsp;&nbsp;&nbsp;&nbsp;
              </Item>
              )
            })}
          </Paper>
          {/* </div> */}
        </Grid>
      </Grid>
    </div>
  </div>)
}

export default App