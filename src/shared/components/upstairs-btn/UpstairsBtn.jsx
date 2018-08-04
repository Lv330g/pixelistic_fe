import React, { Component } from 'react';

import { Button } from '@material-ui/core';
import { KeyboardArrowUp } from '@material-ui/icons';

export default class UpstairsBtn extends Component {
  render() {
    return <Button
      className={"upstairs-btn"}
      variant={"outlined"}
      onClick={this.moveUpstairs}
    > 
      <KeyboardArrowUp />
    </Button>
  }

  moveUpstairs = () => {
    window.scroll(0, 0);
  }
};
