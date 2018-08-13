import React from 'react';
import { Grid, Avatar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default class UserDashboard extends React.Component {

  render() {
    if (this.props.userprofile) {
      return (
        <Grid className="user-dashboard" container alignItems={"center"} justify={"center"} direction={"row"}>
          <Grid item xs={2} container alignItems={"center"} justify={"center"} direction={"column"}>
            <Avatar
              alt="avatar"
              src="https://image.flaticon.com/icons/svg/145/145859.svg"
              className="user-avatar"
            />
          </Grid>
          <Grid item xs={4} container justify={"center"} direction={"column"}>
            <Grid container>
              <div className="user-nickname">
                {this.props.userprofile.nickname}
              </div>
              {this.props.userprofile.nickname === this.props.user.nickname ?
                <Link to={"/edit-profile/" + this.props.userprofile.nickname}>
                  <Button variant="outlined" className="button-edit"
                  >Edit profile</Button>
                </Link>
                : ''}
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
