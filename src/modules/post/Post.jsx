import React from 'react';
import PropTypes from 'prop-types';

import PostFooter from '../../shared/components/post-footer/PostFooter';
import PostHeader from '../../shared/components/post-header/PostHeader';

const Post = React.forwardRef((props, ref) => {
  return <div ref={ref} className="post">
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
  </div>
});

Post.propTypes = {
  post: PropTypes.object.isRequired
};

export default Post;
