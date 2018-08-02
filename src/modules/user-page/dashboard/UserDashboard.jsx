import React from 'react';

import { Grid, Avatar, Button, Icon} from '@material-ui/core';
import { Link } from 'react-router-dom';

export default class UserDashboard extends React.Component {

  render() {
      return (
          <Grid className="user-dashboard" container alignItems={"center"} justify={"center"} direction={"row"}>
            <Grid className="" item xs={2} container alignItems={"center"} justify={"center"} direction={"column"}>
              <Avatar
                alt="tamaraK"
                src="/images/avatar/avatar-sample.jpg"
                className="user-avatar"
              />
            </Grid>
            <Grid className="" item xs={4} container  justify={"center"} direction={"column"}>
                  <div className="user-nickname">
                    kovalchuktamara94
                  </div>

                  <Grid  className="all-infa" container>
                    <div><span>0</span> posts</div>
                    <div className="followers"><span>0</span> followers</div>
                    <div><span>0</span> following</div>
                  </Grid>

                  <Grid  className="description" container direction={"column"}>

                        <div className="user-name">
                              Tamara Kovalchuk
                              {this.props.owner === 'userId' ?
                                <Button className="edit-button" variant="fab" aria-label="Edit">
                                  <Icon>edit_icon</Icon>
                                </Button>
                                :''}

                        </div>


                        <div className="location">Lviv, UKRAINE</div>
                        <Link to="#" className="link">www.facebook.com/tamara.kovalchuk.524</Link>
                  </Grid>
            </Grid>

      </Grid>
      )
  };
};
