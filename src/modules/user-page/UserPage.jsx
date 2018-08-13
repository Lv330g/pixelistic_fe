import React from 'react';
import { connect } from 'react-redux';
import { authValidate } from './../../actions/auth';
import { getProfile } from './../../actions/profile';

import UserDashboard from './components/dashboard/UserDashboard';
import UserPosts from './components/user-posts/UserPosts';
import Header from '../../shared/components/header/Header';

export class UserPage extends React.Component {
    constructor(props) {
       super(props)
       this.state = {
           accessToken: false
       }
   }
    componentWillMount() {
       let accessToken = window.localStorage.getItem('authHeaders') ?
           JSON.parse(window.localStorage.getItem('authHeaders'))['accessToken'] : null;
        this.setState({ accessToken });
   }
    componentDidMount() {
       this.props.authValidate();
       this.props.getProfile(this.props.match.params.nickname);
     }
    render() {
        if (this.props.isAuthorized) {
            return (
                <div  >
                    <Header />
                    <UserDashboard 
                    user={this.props.user} 
                    userprofile={this.props.userprofile}  
                    owner={'userId'} />
                </div>
            );
        }
        else {
            return <div></div>
        }
    }
}
export default connect(
    state => ({
      user: state.auth.user,
      userprofile: state.profile.userprofile,
      isAuthorized: state.auth.isAuthorized
    }),
    dispatch => ({
      authValidate: () => dispatch(authValidate()),
      getProfile: (nickname) => dispatch(getProfile(nickname))
    })
  )(UserPage);
 

