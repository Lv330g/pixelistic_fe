import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { getUsers, updateUserStatus } from  './../../actions/dashboard';
import DashboardTable from  './components/DashboardTable';
import DashboardHeader from './components/DasnboardHeader';

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []  
    };
  };

  componentDidMount() {
    this.props.getUsers();
  };

  static getDerivedStateFromProps(next, state) {
    state.users = next.users;
    return state;
  };

  render() {
    if (this.state.users.length) {
      return (
        <Grid>
          <DashboardTable users={this.state.users} handleStatusChange={this.handleSwitchChange} />
        </Grid>
      );
    };
    return <h1>Loading</h1>
  };

  handleSwitchChange = (e) => {
    const id = e.target.value;
    const status = e.target.checked;
    this.props.updateUserStatus(id, status);
  }; 
};

export default connect(
  state => ({
    users: state.dashboard.users,
  }),
  dispatch => ({
      getUsers: (callback) => dispatch(getUsers(callback)),
      updateUserStatus: (id, status) =>
          dispatch(updateUserStatus(id, status))
  })
)(AdminDashboard)
