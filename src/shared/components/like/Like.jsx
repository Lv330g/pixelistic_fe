import React from 'react';

import { SentimentSatisfiedAlt, ThumbUpAltOutlined } from '@material-ui/icons';


const Like = (props) => {
  return <div className="like" onClick={props.handleLike}>
    {props.liked ? <SentimentSatisfiedAlt className="face-icon"/> 
    : <ThumbUpAltOutlined  className="thumb-up-icon"/>} 
  </div>
};

export default Like;
