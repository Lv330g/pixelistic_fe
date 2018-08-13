import React , { Component } from 'react';
import { Grid } from '@material-ui/core';
import { posts } from './user-posts';
import UserImage from '../user-image/UserImage';
import PostPage from '../post-page/PostPage'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { rowSize } from '../../../../const/user-page-config.js';


export class UserPosts extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      rowSize: null,
      postOpenIndex: -1,
    }
  } 

  componentWillMount() {
    this.setState({ rowSize, posts });
  }

  componentDidUpdate() {
    if (this.state.postOpenIndex > -1){
     disableBodyScroll();
    } else {
      enableBodyScroll();
    };
  }

  componentWillUnmount() {
    enableBodyScroll();
  }

  render () {
    return<div className="user-posts">
      <Grid container direction="column" alignItems="center" item xs={12} className="user-images">
        {this.generateRows()}

        {this.state.postOpenIndex > -1 ? <PostPage 
          post = { this.state.posts[this.state.postOpenIndex] }
          onChangePost = {this.changeCurrentPost}
          onClosePostPage = {this.closePostPage}
          leftButton = { this.state.postOpenIndex === 0 ? false : true }
          rightButton = { this.state.postOpenIndex === this.state.posts.length - 1 ? false : true }
          /> : null}
      </Grid>
    </div>
  }

  generateRows = () => {
    let posts = this.state.posts;
    let rowsCount = Math.ceil(posts.length / this.state.rowSize);
    let curPost = 0;
    let table = [];
    
    for(let i = 0; i < rowsCount; i++) {
      let row = [];
      for( let j = 0; j < this.state.rowSize; j++) {
        if(curPost < posts.length) {
          let rowItem = <UserImage
            key = {posts[curPost]._id}
            id = {posts[curPost]._id}
            img = {posts[curPost].postImage}
            likes = {posts[curPost].likesAmount}
            comments = {posts[curPost++].comments.length}
            onOpenPost = {this.openPostPage}
          />   
          row = [ ...row, rowItem ];
        } else {
          break;
        }
      }
      let completeRow =  <Grid key={i} container item direction="row" xs={8} className="box"> {row} </Grid>;
      table = [ ...table, completeRow ];
    }
    return table;
  }

  openPostPage = (id) => {
    disableBodyScroll();
    setTimeout( () => {
      let index = this.state.posts.findIndex(item => item._id === id);
      this.setState({postOpenIndex: index > -1 ? index : null });  
    }, 10);
     
  }

  closePostPage = () => {
    this.setState({postOpenIndex: -1 });
  }

  changeCurrentPost = (val) => {
    let postOpenIndex = this.state.postOpenIndex;
    postOpenIndex += val;
    
    if(postOpenIndex >= this.state.posts.length || postOpenIndex < 0){
      return;
    }
    this.setState({ postOpenIndex });
  } 
}

export default UserPosts;
