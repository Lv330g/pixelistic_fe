import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';

const PostHeader = (props) => {
  return <Grid item xs={11} container className="post-header">
    <div className="user-avatar">
      <img src={props.authorImg} alt="user avatar" />
    </div>

    <div>
      <div className="user-nickname">
        <Link to=''>{props.authorName}</Link>
      </div>

      <div className="user-geolocation">
        <Link to=''>{props.authorGeo}</Link>
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
