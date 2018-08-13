import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCurrentFollowings, handleFavorite } from '../../../../actions/followings';
import { Scrollbars } from 'react-custom-scrollbars';

import LabelBottomNav from '../label-bottom-nav/LabelBottomNav';
import FollowingItem from '../following-item/FollowingItem';

export class FollowingsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mappedFollowings: false
    }
  }

  componentDidMount(){
    if(!this.props.users.length){
      this.props.loadCurrentFollowings(this.props.user);
    }
  }

  render() {
    let mappedFollowings;
    if (!this.state.mappedFollowings) {
      mappedFollowings = this.renderFirstTime();
    } else {
      mappedFollowings = this.state.mappedFollowings;
    }

    return <div className="followings-list">
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
      >
        {mappedFollowings}
      </Scrollbars>
      <LabelBottomNav 
        handleABC={this.sortByABC}
        handleFavorites={this.sortByFavorites}
        handleReceived={this.sortByReceived}
        handleOnline={this.sortByOnline}
      />
    </div>
  }

  sortByFavorites = () => {
    const filteredFollowings = this.props.users.filter(item => item.following === true)
    .filter(item => item.favorite)
    this.mapFollowings(filteredFollowings);
  }

  sortByReceived = () => {
    const filteredFollowings = this.props.users.filter(item => item.following === true)
    .filter(item => item.newMessages > 0);
    this.mapFollowings(filteredFollowings);
  }

  sortByOnline = () => {
    const filteredFollowings = this.props.users.filter(item => item.following === true)
    .filter(item => item.status === 'online');
    this.mapFollowings(filteredFollowings);
  }

  sortByABC = () => {
    const filteredFollowings = this.props.users.filter(item => item.following === true)
    .sort((a, b) => a.nickname > b.nickname);
    return this.mapFollowings(filteredFollowings);
  }

  mapFollowings = (followings) => {
    const mappedFollowings = followings.map((item, i) => {
      return <FollowingItem 
        following={item}
        key={item.followingId}
        handleFavorite={this.handleFavorite}
      />
    });

    this.setState({mappedFollowings})
  }

  renderFirstTime = () => {
    return this.props.users.filter(item => item.following === true)
      .sort((a, b) => a.nickname > b.nickname)
      .map((item, i) => {
        return <FollowingItem 
          following={item}
          key={item.followingId}
          handleFavorite={this.handleFavorite}
        />
      });
  }

  handleFavorite = (checked, followingInfoId) => {
    const data = {checked, followingInfoId};
    this.props.handleFavorite(data);
  }
};

export default connect(
  state => ({
    users: state.followings.users,
  }),
  dispatch => ({
    loadCurrentFollowings: (user) => dispatch(loadCurrentFollowings(user)),
    handleFavorite: (user) => dispatch(handleFavorite(user)),
  })
)(FollowingsList);
