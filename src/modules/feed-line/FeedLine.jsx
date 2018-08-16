import React, { Component } from 'react';
import { postsOnPage, startPage, bottomOffset } from '../../const/post-config';
import { hardcodedPosts } from './feed-line-posts';

import Post from '../post/Post';

export class FeedLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      per: null,
      page: null,
      totalPages: null,
      scrolling: false,
    }

    this.lastPostRef = React.createRef();
  }

  componentDidMount() {
    this.setState({ 
      per: postsOnPage,
      page: startPage,
      totalPages: Math.ceil(hardcodedPosts.length / postsOnPage)
     });

    window.addEventListener('scroll', this.scrollListener);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener);
  }

  static getDerivedStateFromProps (nextProps, state) {

    let feedlinePosts = nextProps.posts.filter( item => item.type === 'feed');
    const postsToShow = feedlinePosts.filter((item, i) => i < state.page * state.per);
    state.posts =  [...postsToShow];
    state.scrolling = false;
    return state;
  }

  render() {
    let allPosts = this.state.posts.map((item, i, arr) => {
      return <Post
        key={item._id}
        post={item}
        nickname={this.props.nickname}
        userId={this.props.user._id}
        ref={el => this.lastPostRef = el}
      />
    });

    return <div className="feed-line">
      {allPosts}
    </div>
  }

  handleScroll = () => {
    const { scrolling, totalPages, page} = this.state;
    if (scrolling) return;
    if (totalPages < page) return;
    const lastPost = this.lastPostRef;
    const lastPostOffset = lastPost.offsetTop + lastPost.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    if (pageOffset > lastPostOffset - bottomOffset) {
      this.loadMore()
    }
  }

  loadPosts = async () => {
    let feedlinePosts = this.props.posts.filter( item => item.type === 'feed');
    
    const { per, page } = this.state;
    const postsToShow = feedlinePosts.filter((item, i) => i < page * per);

    this.setState({
      posts: [...postsToShow],
      scrolling: false
    });
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      scrolling: true,
    }), this.loadPosts);
  }

  scrollListener = e => {
    this.handleScroll(e)
  }

  likeHandler = () => {
    this.loadPosts();
  }
};

export default FeedLine;
