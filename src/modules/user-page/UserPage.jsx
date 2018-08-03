import React, { Fragment } from 'react';

import UserDashboard from './dashboard/UserDashboard';
import Header from '../../shared/components/header/Header';

class UserPage extends React.Component {
    render() {
    return (
        <Fragment>
            <Header />
            <UserDashboard owner={'userId'}/>
        </Fragment>
    );
    }
}
export default UserPage;

