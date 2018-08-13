import React from 'react';

import { Button } from '@material-ui/core';

const PassportBtn = (props) => {
  return <Button 
    fullWidth
    id="passport-btn" 
    className={`${props.name}-btn`} 
    type="button" 
    color="primary" 
    variant="contained"
    onClick={props.onClick}
    >
      <div className={`${props.name}-icon`}></div>
      Log in with {props.name}
  </Button>
}

export default PassportBtn;
