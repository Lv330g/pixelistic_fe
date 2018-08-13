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
    />
    <FeedAside 
      user={props.user}
    />
    <ScrollToTop showUnder={160}>
      <UpstairsBtn />
    </ScrollToTop>
  </div>
}
  
export default Feed;
