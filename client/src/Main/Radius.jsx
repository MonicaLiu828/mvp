import * as React from 'react'
import {useState} from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'

const Radius = (props) => {

  const handleClick = (popupState, data) => {
    popupState.close()
    props.setRadius(data)
    // console.log(data)
  }

  const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
  }


  return (
  <PopupState variant="popover" popupId="demo-popup-menu">
    {(popupState) => (
    <React.Fragment>
      <Button variant="contained" {...bindTrigger(popupState)}>
        {props.radius === 'RADIUS(METERS)'? props.radius : 'RADIUS ' + props.radius + ' M'}
      </Button>
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={() => handleClick(popupState,parseInt(getRandomArbitrary(1, 500)))}>1 - 500</MenuItem>
        <MenuItem onClick={() => handleClick(popupState,parseInt(getRandomArbitrary(501, 1000)))}>500 - 1000</MenuItem>
        <MenuItem onClick={() => handleClick(popupState,parseInt(getRandomArbitrary(1001, 2000)))}>1000 - 2000</MenuItem>
        <MenuItem onClick={() => handleClick(popupState,parseInt(getRandomArbitrary(2001, 4000)))}>2000 - 4000</MenuItem>
      </Menu>
    </React.Fragment>
  )}
  </PopupState>
 )
}

export default Radius;
