
import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { PopupState, bindTrigger, bindMenu } from 'material-ui-popup-state'

/** 
 * Category options for users to select, this will be used as the condition during the
 * call to Yelp.
 */
const Category = (props) => {
  /**
   * Handle default options click
   */
  var handleDefault = (popupState, name) => {
    popupState.close();
    props.setCategory(name);
  }

  /**
   * Handle user input category
   */
  var handleMore = (popupState) => {
    var type = prompt("Please enter your preferred cateogory:", "");
    if (type == null || type == "") {
      alert("User cancelled the prompt.");
    } else {
      props.setCategory(type);
      console.log('type',type);
      alert("you have chosed " + type);
    }
    popupState.close();
  }

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}>
            {props.category}
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={() => handleDefault(popupState,'mexican')}>Mexican</MenuItem>
            <MenuItem onClick={() => handleDefault(popupState,'japanese')}>Japanese</MenuItem>
            <MenuItem onClick={() => handleDefault(popupState,'chinese')}>Chinese</MenuItem>
            <MenuItem onClick={() => handleDefault(popupState,'american')}>American</MenuItem>
            <MenuItem onClick={() => handleMore(popupState)}>type in others</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}

export default Category;