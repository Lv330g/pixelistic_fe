import React from 'react';

import ScrollToTop from 'react-scroll-up';
import FeedLine from '../feed-line/FeedLine';
import FeedAside from '../feed-aside/FeedAside';
import UpstairsBtn from '../../shared/components/upstairs-btn/UpstairsBtn';


export const Feed = (props) => {
    return <div 
        className="feed" 
        ref={this.FeedRef}
      > 
        <FeedLine 
          nickname={props.user.nickname}
          user={props.user} 
          posts = {props.posts}
        />

        <FeedAside 
          user={props.user}
          users={props.users}
          handleFavorite={props.handleFavorite}
        />
        <ScrollToTop showUnder={160}>
          <UpstairsBtn />
        </ScrollToTop>
      </div>
  }
  
export default Feed;
