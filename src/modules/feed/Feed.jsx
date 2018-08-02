import React from 'react';

import FeedLine from '../feed-line/FeedLine';
import Header from '../../shared/components/header/Header'

import { Grid } from '@material-ui/core';

const Feed = () => {
  return <Grid container direction={"column"} alignItems={"flex-start"} item xs={12}>
    {/* Header   */} {/* Header      */}
    {/* Feedline */} {/* UserInfo    */}
    {/* Feedline */} {/* MiniChat(?) */}
    {/* Feedline */} {/* Footer      */}
    <Header />
    <FeedLine />
  </Grid>
};

export default Feed;
