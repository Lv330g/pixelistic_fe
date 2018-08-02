import React from 'react';

import UserDashboard from './dashboard/UserDashboard';

class UserPage extends React.Component {
    render() {
    return (
        <UserDashboard owner={'userId'}/>
        );
    }
}
export default UserPage;

