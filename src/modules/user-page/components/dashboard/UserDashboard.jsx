import React from 'react';
import { Link } from 'react-router-dom';

import DashboardBtn from '../dashboard-btn/DashboardBtn';

import { Grid, Avatar } from '@material-ui/core';

export default class UserDashboard extends React.Component {
  render() {
    if (this.props.userprofile._id) {
      return (
        <Grid className="user-dashboard" container alignItems={"center"} justify={"center"} direction={"row"}>
          <Grid item container className="avatar-container" xs={2} alignItems={"center"} justify={"center"} direction={"column"}>
            <Avatar
              alt="avatar"
              src={this.props.userprofile.avatar}
              className="user-avatar"
            />
          </Grid>
          <Grid item xs={4} container justify={"center"} direction={"column"}>
            <Grid container>
              <div className="user-nickname">
                {this.props.userprofile.nickname}
              </div>
              <DashboardBtn 
                profileUser={this.props.userprofile}
                current={this.props.user}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                users={this.props.users}
              />
            </Grid>
            <Grid className="all-infa" container>
              <div><span>0</span> posts</div>
              <div className="followers"><span>0</span> followers</div>
              <div><span>0</span> following</div>
            </Grid>
            <Grid container direction={"column"}>
              <div className="user-name">
                {this.props.userprofile.userName}
              </div>
              <div className="location">{this.props.userprofile.userBio}</div>
              <Link to="#" className="link">{this.props.userprofile.website}</Link>
            </Grid>
          </Grid>
        </Grid>
      )
    } else {
      return <div></div>
    }
  };
};
