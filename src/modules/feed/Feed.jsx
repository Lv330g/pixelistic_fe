import React from 'react';

import FeedLine from '../feed-line/FeedLine';

import { Grid } from '@material-ui/core';

const Feed = () => {
  return <Grid container direction={"column"} alignItems={"flex-start"} item xs={12}>
    {/* Header   */} {/* Header      */}
    {/* Feedline */} {/* UserInfo    */}
    {/* Feedline */} {/* MiniChat(?) */}
    {/* Feedline */} {/* Footer      */}
    <FeedLine />
  </Grid>
};

export default Feed;
