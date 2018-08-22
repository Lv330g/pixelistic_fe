import React from 'react';
import { TablePagination, TableFooter, Grid, Typography, TableBody, TableCell, TableRow, Table, Checkbox, FormControlLabel, Switch } from '@material-ui/core';
import DashboardPagination from './DashboardPagination';
import DashboardTableHead from './DashboardTableHead';

const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getSorting = (order, orderBy) => {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
};

class DashboardTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'nickname',
    selected: [],
    page: 0,
    rowsPerPage: 5
  };
  render() {
    const { rowsPerPage, page, order, orderBy } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.users.length - page * rowsPerPage); 
    return (
      <Grid>
        <Typography className="dashboard-subheading" variant="subheading" color="textSecondary">
          All users
        </Typography>
        <Table className="dashboard-table">      
          <DashboardTableHead 
            users={this.props.users}
            selectedCount={this.state.selected.length}  
            rowsCount={this.props.users.length}
            handleSelectAll={this.handleSelectAllClick}
            order={order}
            orderBy={orderBy}
            onRequestSort={this.handleRequestSort}
          />
          <TableBody>
            {this.props.users.sort(getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => {
                const isSelected = this.isSelected(user._id);
                return (
                  <TableRow 
                    key={user._id} 
                    className="dashboard-tablerow"
                    hover
                    aria-checked={isSelected}
                    tabIndex={-1}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" checked={isSelected} onClick={event => this.handleClick(event, user._id)} />
                    </TableCell>
                    <TableCell>{user.nickname}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.posts.length}</TableCell>
                    <TableCell className="dashboard-status-cell">  
                      <FormControlLabel
                        control={ 
                          <Switch
                            checked={user.isActive}
                            onChange={this.props.handleStatusChange}
                            value={user._id}
                          />
                        }        
                        label = {user.isActive ? 'Active' : 'Suspended' }
                      /> 
                    </TableCell>
                  </TableRow>
                )
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination className="dashboard-pagination"
                colSpan={5}
                count={this.props.users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                ActionsComponent={DashboardPagination}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Grid>
    );
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    };
    this.setState({ selected: newSelected });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: this.props.users.map(user => user._id) }));
      return;
    };
    this.setState({ selected: [] });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    };

    this.setState({ order, orderBy });
  };
};

export default DashboardTable;
