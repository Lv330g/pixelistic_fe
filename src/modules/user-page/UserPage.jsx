import React from 'react';
import { connect } from 'react-redux';
import { getProfile } from './../../actions/profile';
import { postOwnPosts } from './../../actions/post';

import UserDashboard from './components/dashboard/UserDashboard';
import UserPosts from './components/user-posts/UserPosts';
import LoadingSpinner from '../../shared/components/loading-spinner/LoadingSpinner';

export class UserPage extends React.Component {
    constructor(props) {
       super(props)
       this.state = {
         ownPage: false
       }
   }

  componentWillMount (){
    const ownPage = this.props.match.params.nickname === this.props.user.nickname;
    if(ownPage){
      if(!this.props.ownPosts.length){
        this.props.postOwnPosts(this.props.user);
      }
    }
    
    this.setState({ ownPage });
  }

  componentDidMount() {
    this.props.getProfile(this.props.match.params.nickname);
  }
  render() {
    if(this.props.userprofile){
      return <div>
          <UserDashboard 
            user={this.props.user} 
            userprofile={this.props.userprofile}  
            owner={'userId'}
          />
          <UserPosts 
            posts={ this.state.ownPage ? this.props.ownPosts : this.props.userprofile.posts} 
            ownPage={this.state.ownPage}
          />
      </div>
    }
    return <LoadingSpinner/>
  }
}
export default connect(
    state => ({
      userprofile: state.profile.userprofile,
      ownPosts: state.post.ownPosts
    }),
    dispatch => ({
      getProfile: (nickname) => dispatch(getProfile(nickname)),
      postOwnPosts: (user) => dispatch(postOwnPosts(user))
    })
  )(UserPage);
 

