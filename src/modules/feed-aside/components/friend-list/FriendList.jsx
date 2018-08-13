import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { socketConnect } from 'socket.io-react';

import friends from './friend-list';
import LabelBottomNav from '../label-bottom-nav/LabelBottomNav';
import FriendItem from '../friend-item/FriendItem';

export class FriendList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: [],
      mappedfriends: []
    }
  }

  componentWillMount() {
    this.setState({friends});
  }

  componentDidMount() {
    // const { socket } = this.props;
    // socket.emit('iAmOnline', this.props.user._id);
    // socket.emit('needFriends', this.props.user._id);

    // socket.on('gettingFriends', (friends) => {
    //   this.setState({friends});
    //   this.sortByABC(friends);
    // });

    // socket.on('favoritesManaged', () => {
    //   socket.emit('needFriends', this.props.user._id);
    // });

    this.sortByABC();
  }

  render() {
    const { mappedfriends } = this.state;

    return <div className="friend-list">
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
      >
        {mappedfriends}
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
    const filteredFriends = this.state.friends.filter(item => item.favorite);
    this.mapFriends(filteredFriends);
  }

  sortByReceived = () => {
    const filteredFriends = this.state.friends.filter(item => item.newMessages > 0);
    this.mapFriends(filteredFriends);
  }

  sortByOnline = () => {
    const filteredFriends = this.state.friends.filter(item => item.status === 'online');
    this.mapFriends(filteredFriends);
  }

  sortByABC = () => {
    const filteredFriends = this.state.friends.sort((a, b) => a.nickname > b.nickname);
    this.mapFriends(filteredFriends);
  }

  mapFriends = (friends) => {
    const mappedfriends = friends.map((item, i) => {
      return <FriendItem 
        friend={item}
        key={item._id}
        handleFavorite={this.handleFavorite}
      />
    });

    this.setState({
      mappedfriends
    });
  }

  handleFavorite = (checked, friend) => {
    const data = {
      current: this.props.user._id,
      friend,
      checked
    };

    this.props.socket.emit('manageFavorites', data);
  }
};

export default socketConnect(FriendList);
