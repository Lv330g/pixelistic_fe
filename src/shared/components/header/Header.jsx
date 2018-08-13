import React from 'react';
import { Grid,  Input, Popper, Button, Paper, Grow, ClickAwayListener, MenuList, MenuItem } from '@material-ui/core';
import { Extension } from '@material-ui/icons';
import { Link } from 'react-router-dom';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  render() {
    const { open } = this.state;

    return (
      <Grid container alignItems={"center"} justify={"center"} direction={"column"}>
          <Grid container className="header" item xs={12} alignItems = {"center"}>
              <Grid item xs={1}> </Grid> 
              <Grid className="logo" item xs={2}><span className="logo-ident">Pixel</span></Grid>
              <Grid item xs={2}></ Grid>
              <Grid item xs={2}>
                <Input placeholder="Search" />
              </Grid>
              <Grid item xs={4} ></Grid>
              <Grid item xs={1}>
                <Button
                buttonRef={node => {
                  this.anchorEl = node;
                }}
                aria-owns={open ? "menu-list-grow" : null}
                aria-haspopup="true"
                onClick={this.handleToggle}
                >
                  <Extension className="extension-icon" fontSize={'inherit'} />
                </Button>
                <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    id="menu-list-grow"
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={this.handleClose}>
                          <MenuList>
                            <Link to="/profile">
                              <MenuItem >
                                  Profile
                              </MenuItem>
                            </Link>
                            <Link to="/">
                              <MenuItem onClick={this.handleClose}>
                                Feed line
                              </MenuItem>
                            </Link> 
                            <MenuItem onClick={this.props.onSignOut}>Logout</MenuItem>
                          </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                  )}
                </Popper>            
              </Grid>
          </Grid>
      </Grid>
    )
  }

  handleToggle = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };
  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };
};
export default Header;
