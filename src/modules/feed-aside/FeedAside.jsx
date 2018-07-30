import React from 'react';

import { Grid, Divider } from '@material-ui/core';

const FeedAside = () => {
  return <Grid className="feed-aside" container justify={"center"} item xs={4}>
    <Grid className="grid-inside" item xs={11} container direction={"column"} justify={"space-between"}>
      <div className="user-info">
        User info
      </div>
      <Divider />
      <div className="chat">
        Chat?
      </div>
      <Divider />
      <div className="footer">
        Footer
      </div>
    </Grid>
  </Grid>
}

export default FeedAside;
