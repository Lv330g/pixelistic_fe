import React from 'react';
import { connect } from 'react-redux';
import { getProfile } from './../../actions/profile';
import { postOwnPosts } from './../../actions/post';
import { follow, unfollow } from './../../actions/followings';

import UserDashboard from './components/dashboard/UserDashboard';
import UserPosts from './components/user-posts/UserPosts';
import LoadingSpinner from '../../shared/components/loading-spinner/LoadingSpinner';

export class UserPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ownPage: false,
      userLoaded: false,
      profileUser: null
    }
  }

  componentDidMount(){
    const profileNickname = this.props.match.params.nickname;
    const ownPage = profileNickname === this.props.user.nickname;
    this.props.getProfile(profileNickname);

    if(ownPage){
      if(!this.props.ownPosts.length){
        this.props.postOwnPosts(this.props.user);
      }
    }

    this.setState({ ownPage });
  }

  static getDerivedStateFromProps(next, state) {
    state.userLoaded = false;
    const profileNickname = next.match.params.nickname;
    const profileUser = next.users.filter(item => {
      return item.nickname === profileNickname;
    });
    if (profileUser[0]) {
      state.profileUser = profileUser[0];
      state.userLoaded = true;
    }
    return state;
  }

  render() {
    if (this.state.userLoaded) {
      return <div>
          <UserDashboard 
            user={this.props.user} 
            userprofile={this.state.profileUser}  
            owner={'userId'}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            users={this.props.users}
          />
          <UserPosts 
            posts={ this.state.ownPage ? this.props.ownPosts : this.state.profileUser.posts} 
            ownPage={this.state.ownPage}
          />
      </div>
    }

    return <LoadingSpinner/>
  }
};

export default connect(
  state => ({
    users: state.followings.users,
    ownPosts: state.post.ownPosts
  }),
  dispatch => ({
    getProfile: (nickname) => dispatch(getProfile(nickname)),
    postOwnPosts: (user) => dispatch(postOwnPosts(user)),
    follow: (data) => dispatch(follow(data)),
    unfollow: (data) => dispatch(unfollow(data)),
  })
)(UserPage);
