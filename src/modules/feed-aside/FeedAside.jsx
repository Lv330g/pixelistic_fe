import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FriendList from './components/friend-list/FriendList';

import { Grid, Divider, Avatar } from '@material-ui/core';

export default class FeedAside extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userLink: ''
    }
  }

  componentDidMount() {
    this.setState({
      userLink: ''
    });
  }

  render() {
    return <div className="feed-aside">
      <Grid className="grid-inside" item xs={11} container direction={"column"} justify={"space-between"}>
        <Grid className="user-info" container alignItems={"center"} justify={"center"}>
          <Link to={this.state.userLink}>
            <Avatar
              alt={"user avatar"}
              src={this.props.user.avatar}
              className="user-avatar"
            />
          </Link>
          <Link to={this.state.userLink}>
            <p className="light-grey user-nickname">
              {this.props.user.nickname}
            </p>
          </Link>
        </Grid>

        <Divider />

        <FriendList 
          user={this.props.user}
        />

        <Divider />

        <Grid className="footer light-grey" container alignItems={"center"} justify={"center"}>
          &copy; Lv-330 Node.js, 2018
        </Grid>
      </Grid>
    </div>
  }
};
