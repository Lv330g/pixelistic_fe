import React from 'react';
import { Grid, Avatar } from '@material-ui/core';
import DashboardBtn from '../dashboard-btn/DashboardBtn';

 export default class UserDashboard extends React.Component {
   render() {
      return (
        <Grid className="user-dashboard" container alignItems={"center"} justify={"center"} direction={"row"}>
          <Grid item>
            <Avatar
              alt={"user avatar"}
              src={this.props.userprofile.avatar}
              className="user-avatar"
            />
          </Grid>
          <Grid className="left-pdg" item>
            <Grid className="nick-btn">
              <div className="user-nickname">
                {this.props.userprofile.nickname}
              </div>
              <DashboardBtn 
                profileUser={this.props.userprofile}
                current={this.props.user}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                users={this.props.users}
                postAddToFeedLine = {this.props.postAddToFeedLine}
                postRemoveFromFeedLine = {this.props.postRemoveFromFeedLine}
              />
            </Grid>
            <Grid className="all-infa" container>
              <div className="quantity"><span className="number">
                {this.props.userprofile.posts ? this.props.userprofile.posts.length: '0'}
              </span> posts</div>
              <div className="followers quantity"><span className="number">
              {this.props.userprofile.followers ? this.props.userprofile.followers.length: '0'}
                </span> followers</div>
              <div className="quantity"><span className="number">
                {this.props.userprofile.followings ? this.props.userprofile.followings.length: '0'}
              </span> followings</div>
            </Grid>
            <Grid container direction={"column"}>
            <div className="user-name">
                  {this.props.userprofile.fullName}
                </div>
                <div className="location">{this.props.userprofile.bio}</div>
                <a target="_blank" href={`http://${this.props.userprofile.website}`} className="link-website">{this.props.userprofile.website}</a>
              </Grid>
            </Grid>
          </Grid>
      )
  };
};
