import React from 'react';
import { connect } from 'react-redux';
import { getProfile } from './../../actions/profile';
import { follow, unfollow } from './../../actions/followings';
import { postAddPostsToSession, postAddToFeedLine, postRemoveFromFeedLine } from './../../actions/post';

import UserDashboard from './components/user-dashboard/UserDashboard';
import UserPosts from './components/user-posts/UserPosts';
import LoadingSpinner from '../../shared/components/loading-spinner/LoadingSpinner';

export class UserPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userLoaded: false,
      profileUser: null,
      path:'',
      posts: []
    }
  }

  componentDidMount(){
    this.getNewProfile();
  }

  componentDidUpdate(){
    this.getNewProfile();
  }

  static getDerivedStateFromProps(next, state) {
    const profileNickname = next.match.params.nickname;

    if(state.path !== next.match.params.nickname){
      const profileUser = next.users.find(item =>item.nickname === profileNickname);
      if (profileUser) {  
        next.postAddPostsToSession(profileUser.posts);
        state.profileUser = profileUser;
        state.userLoaded = true;
        state.path = next.match.params.nickname;
      }
    }

    let posts = next.posts.filter((item) => item.author.nickname === profileNickname);
    state.posts = posts;
    return state;
  }

  render() {
    if (this.state.userLoaded) {

      return <div>
          <UserDashboard 
            user={this.props.user} 
            userprofile={this.state.profileUser}  
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            postAddToFeedLine = {this.props.postAddToFeedLine}
            postRemoveFromFeedLine = {this.props.postRemoveFromFeedLine}
            users={this.props.users}
          />
          
          <UserPosts 
            posts={this.state.posts} 
            userId = {this.props.user._id}
            userNickname = {this.props.user.nickname}
            ownPage = {this.props.user._id === this.state.profileUser._id}
          />
      </div>
    }

    return <LoadingSpinner/>
  }

  getNewProfile = () =>{
    const profileNickname = this.props.match.params.nickname;
    let inUsers =  this.props.users.some(item => item.nickname === profileNickname);

    if(!inUsers && ! this.props.loading) {
      this.props.getProfile(profileNickname);
    }
  }

};

export default connect(
  null,
  dispatch => ({
    getProfile: (nickname) => dispatch(getProfile(nickname)),
    follow: (data) => dispatch(follow(data)),
    unfollow: (data) => dispatch(unfollow(data)),
    postAddPostsToSession: (posts) => dispatch(postAddPostsToSession(posts)),
    postAddToFeedLine: (userId) => dispatch(postAddToFeedLine(userId)),
    postRemoveFromFeedLine: (userId) => dispatch(postRemoveFromFeedLine(userId))
  })
)(UserPage);
