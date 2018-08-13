import React , { Component } from 'react';
import { Grid } from '@material-ui/core';
import { BrokenImage, AddAPhoto } from '@material-ui/icons';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { Link } from 'react-router-dom';

import { rowSize } from '../../../../const/user-page-config.js';
import { host, port } from '../../../../const/node-server-config'

import MinimizedPost from '../minimized-post/MinimizedPost';
import PostPage from '../post-page/PostPage';
import LoadingSpinner from '../../../../shared/components/loading-spinner/LoadingSpinner';


export class UserPosts extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      rowSize: null,
      postOpenIndex: -1,
    }
  } 

componentWillMount () {
    this.setState({ rowSize, posts: this.props.posts});   
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
    if(this.state.posts.length > 0){
      return <div className="user-posts">
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

    if(this.state.posts.length === 0){
      return <div className="empty-posts">  
        <p> {this.props.ownPage ? 'You have no posts' : 'This user has no posts yet'} </p>
        { this.props.ownPage ? 
        <Link to="/upload"> <AddAPhoto className="add-photo"/> </Link> : <BrokenImage/> 
        }
      </div>
    }

    return <LoadingSpinner size={40}/>
  }

  generateRows = () => {

    let posts = this.state.posts;
    let rowsCount = Math.ceil(posts.length / this.state.rowSize) || 1;
    let curPost = 0;
    let table = [];
    
    for(let i = 0; i < rowsCount; i++) {      
      let row = [];
      for( let j = 0; j < this.state.rowSize; j++) {
        if(curPost < posts.length) {
          let rowItem = <MinimizedPost
            key = {posts[curPost]._id}
            id = {posts[curPost]._id}
            img = {`${host}:${port}/${posts[curPost++].image}`}
            likes = {0}
            comments = {0}
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
