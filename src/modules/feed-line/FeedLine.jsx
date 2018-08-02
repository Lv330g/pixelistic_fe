import React, { Component } from 'react';

import Post from '../post/Post';
import { postsOnPage } from '../../const/post-config';
import { posts } from './feed-line-posts';

import { Grid } from '@material-ui/core';

export default class FeedLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    }
  }

  componentDidMount() {
    this.setState({ posts: posts });
  }

  render() {
    let allPosts = this.state.posts
      .filter((item, i) => i >= this.state.posts.length - postsOnPage)
      .map(item => {
        return <Post
          key={item._id}
          post={item}
          nickname={this.props.nickname}
        />
      });

    return <Grid container direction={"column"} alignItems={"flex-end"} item xs={8} className="feed-line">
      {allPosts}
    </Grid>
  }
}
