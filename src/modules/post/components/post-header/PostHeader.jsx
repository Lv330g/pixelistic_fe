import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Grid, Avatar } from '@material-ui/core';

const PostHeader = (props) => {
  return <Grid item xs={11} container className="post-header">
    <Link to=''>
      <Avatar 
        className="user-avatar" 
        src={props.authorImg} 
        alt={"user avatar"}
      />
    </Link>

    <div>
      <div className="user-nickname">
        <Link className="link" to=''>{props.authorName}</Link>
      </div>

      <div className="user-geolocation">
        <Link className="link" to=''>{props.authorGeo}</Link>
      </div>
    </div>
  </Grid>
};

PostHeader.propTypes = {
  authorImg: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorGeo: PropTypes.string.isRequired,
};

export default PostHeader;
