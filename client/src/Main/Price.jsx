import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'

/**
 * Price component to display price options for users to select, this will be used as
 * filter condition during the call the Yelp.
 */
const Price = (props) => {

  /**
   * Handle click on the price button
   */
  const handleClick = (popupState, data) => {
    popupState.close();
    props.setPrice(data);
  }

  /**
   * Get price label based on price number
   */
  const getPriceLabel = (priceNum) => {
    if (priceNum === '1') {
      return '$';
    } else if (priceNum === '2') {
      return '$$';
    } else if (priceNum === '3') {
      return '$$$';
    } else if (priceNum === '4') {
      return '$$$$';
    } else {
      return 'PRICE';
    }
  }

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}>
            {getPriceLabel(props.price)}
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={() => handleClick(popupState,'1')}>$</MenuItem>
            <MenuItem onClick={() => handleClick(popupState,'2')}>$$</MenuItem>
            <MenuItem onClick={() => handleClick(popupState,'3')}>$$$</MenuItem>
            <MenuItem onClick={() => handleClick(popupState,'4')}>$$$$</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}

export default Price