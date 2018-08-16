import React from 'react';
import PropTypes from 'prop-types';
import { host, port } from '../../const/node-server-config'
import PostFooter from '../../shared/components/post-footer/PostFooter';
import PostHeader from '../../shared/components/post-header/PostHeader';

const Post = React.forwardRef((props, ref) => {
  return <div ref={ref} className="post">
    <PostHeader
      authorName={props.post.author.nickname}
      authorGeo={props.post.geolocation}
      authorImg={props.post.author.avatar}
    />

    <div>
      <img className='post-image' alt="post.jpg" src={`${host}:${port}/${props.post.image}`} />
    </div>

    <PostFooter
      comments={props.post.comments}
      liked={props.post.likes.indexOf(props.userId) > -1}
      likesAmount={props.post.likes.length}
      postId={props.post._id}
      authorName={props.post.author.nickname}
      authorId={props.post.author._id}
      authorComment={props.post.description}
      date = {props.post.timestamp}
      nickname={props.nickname}
      userId={props.userId}
    />
  </div>
});

Post.propTypes = {
  post: PropTypes.object.isRequired
};

export default Post;
