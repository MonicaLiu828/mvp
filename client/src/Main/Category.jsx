
import * as React from 'react'
import {useState} from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'

const Category = (props) => {
  var handle1 = (popupState, name) => {
    popupState.close()
    props.setCategory(name)
    console.log(name)
  }

  var handleMore = (popupState) => {
    var type = prompt("Please enter your preferred cateogory:", "");
    if (type == null || type == "") {
      alert("User cancelled the prompt.");
    } else {
      props.setCategory(type)
      console.log('type',type)
      alert("you have chosed " + type);
    }
    popupState.close()

  }

  return (
  <PopupState variant="popover" popupId="demo-popup-menu">
    {(popupState) => (
    <React.Fragment>
      <Button variant="contained" {...bindTrigger(popupState)}>
        {props.category}
      </Button>
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={() => handle1(popupState,'mexican')}>Mexican</MenuItem>
        <MenuItem onClick={() => handle1(popupState,'japanese')}>Japanese</MenuItem>
        <MenuItem onClick={() => handle1(popupState,'chinese')}>Chinese</MenuItem>
        <MenuItem onClick={() => handle1(popupState,'american')}>American</MenuItem>
        <MenuItem onClick={() => handleMore(popupState)}>type in others</MenuItem>
      </Menu>
    </React.Fragment>
  )}
  </PopupState>
  )
}


export default Category;