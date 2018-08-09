import React, { Component } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { ImportExport, Favorite, Mail, WifiTethering } from '@material-ui/icons';

export default class LabelBottomNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  componentWillMount() {
    this.setState({
      value: 'ABC'
    });
  }

  render() {
    const { value } = this.state;

    return (
      <BottomNavigation value={value} onChange={this.handleChange} className="bottom-nav">
        <BottomNavigationAction 
          label="ABC" 
          value="ABC" 
          icon={<ImportExport />}
          onClick={this.props.handleABC}
        />
        <BottomNavigationAction 
          label="Favorites" 
          value="favorites" 
          icon={<Favorite />}
          onClick={this.props.handleFavorites}
        />
        <BottomNavigationAction 
          label="Received" 
          value="received" 
          icon={<Mail />}
          onClick={this.props.handleReceived}
        />
        <BottomNavigationAction 
          label="Online" 
          value="online" 
          icon={<WifiTethering />}
          onClick={this.props.handleOnline}
        />
      </BottomNavigation>
    );
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };
}
