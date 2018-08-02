import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Chat from '../chat/Chat';

import { Grid, Divider, Avatar } from '@material-ui/core';

export default class FeedAside extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatarImg: '',
      userLink: ''
    }
  }

  componentDidMount() {
    this.setState({
      avatarImg: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png',
      userLink: ''
    });
  }

  render() {
    return <Grid className="feed-aside" container justify={"center"} item xs={4}>
      <Grid className="grid-inside" item xs={11} container direction={"column"} justify={"space-between"}>
        <Grid className="user-info" container alignItems={"center"} justify={"center"}>
          <Link to={this.state.userLink}>
            <Avatar
              alt={"user avatar"}
              src={this.state.avatarImg}
              className="user-avatar"
            />
          </Link>
          <Link to={this.state.userLink}>
            <p className="light-grey user-nickname">
              {this.props.nickname}
            </p>
          </Link>
        </Grid>

        <Divider />

        <Chat 
          nickname={this.props.nickname}
        />

        <Divider />

        <Grid className="footer light-grey" container alignItems={"center"} justify={"center"}>
          &copy; Lv-330 Node.js, 2018
        </Grid>
      </Grid>
    </Grid>
  }
};
