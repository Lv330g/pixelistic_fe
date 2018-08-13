import React, { Fragment } from 'react';

import UserDashboard from './components/dashboard/UserDashboard';
import UserPosts from './components/user-posts/UserPosts';
import Header from '../../shared/components/header/Header';

class UserPage extends React.Component {
    render() {
    return (
        <Fragment>
            <Header />
            <UserDashboard owner={'userId'}/>
            <UserPosts/>
        </Fragment>
    );
    }
}
export default UserPage;

