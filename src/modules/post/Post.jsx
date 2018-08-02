import React from 'react';
import PropTypes from 'prop-types';

import PostFooter from '../post/components/post-footer/PostFooter';
import PostHeader from '../post/components/post-header/PostHeader';
import { Grid } from '@material-ui/core'

const Post = (props) => {
  return <Grid item xs={10} alignItems={"center"} direction={"column"} container className="post">
    <PostHeader
      authorName={props.post.authorName}
      authorGeo={props.post.authorGeo}
      authorImg={props.post.authorImg}
    />

    <div>
      <img className='post-image' alt="post.jpg" src={props.post.postImage} />
    </div>

    <PostFooter
      post={props.post}
      nickname={props.nickname}
    />
  </Grid>
};

Post.propTypes = {
  post: PropTypes.object.isRequired
};

export default Post;
