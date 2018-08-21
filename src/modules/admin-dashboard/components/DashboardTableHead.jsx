import React from 'react';
import { TableSortLabel, TableHead, TableRow, TableCell, Checkbox, Tooltip } from '@material-ui/core'

class DashboardTableHead extends React.Component {
  render() {
    const { selectedCount, rowsCount, handleSelectAll,  order, orderBy } = this.props;
    return (
      <TableHead>
        <TableRow className="dashboard-tablehead">
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={selectedCount > 0 && selectedCount < rowsCount}
              checked={selectedCount === rowsCount}
              onChange={handleSelectAll}
            />
          </TableCell>
          <TableCell>
            <Tooltip
              title="Sort"
              placement= 'bottom-end' 
              enterDelay={300}
            >
              <TableSortLabel
                active={orderBy === 'nickname'}
                direction={order}
                onClick={this.createSortHandler('nickname')}
              >
                Nickname
              </TableSortLabel>
            </Tooltip>
          </TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Number of posts</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };
};

export default DashboardTableHead;
