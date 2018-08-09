import React from 'react';
import { Link } from 'react-router-dom';

import Like from '../../../../shared/components/like/Like';

import { 
  Avatar,
  Badge,
  ExpansionPanel, 
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button
} from '@material-ui/core';
import { 
  ExpandMore, 
  Mail,
  Person
} from '@material-ui/icons';

const FriendItem = (props) => {
  const { 
    nickname, 
    status, 
    newMessages, 
    avatar, 
    favorite, 
    _id
  } = props.friend;

  let chipAvatar;
  if (avatar) {
    chipAvatar = <Avatar
      src={avatar} 
      alt={"avatar"}
      className="avatar"
    />
  } else {
    chipAvatar = <Avatar className="avatar">
      {nickname[0].toUpperCase()}
    </Avatar>;
  }

  let badge;
  if (newMessages > 0) {
    badge = <Badge 
      badgeContent={newMessages} 
      color="secondary"
      className="badge"
    >
      <Mail />
    </Badge>;
  }

  return <ExpansionPanel className="friend-item">
    <ExpansionPanelSummary className="exp-summary" expandIcon={<ExpandMore />}>
      <div className={`chip chip-${status}`}>
        {chipAvatar}
        <p className={"nickname"}>
          {nickname}
        </p>
        {badge}
      </div>
    </ExpansionPanelSummary>

    <ExpansionPanelDetails className="exp-details">
      <Button variant={"contained"} size="small" className="btn">
        <Link to="" className="link">
          Profile
          <Person />
        </Link>
      </Button>
      <Button variant={"contained"} size="small" className="btn msgs-btn">
        <Link to="" className="link">
          Messanger
          <Mail />
        </Link>
      </Button>
      <Like
        className="favorite"
        liked={favorite}
        parentId={_id}
        handleLike={props.handleFavorite}
      />
    </ExpansionPanelDetails>
  </ExpansionPanel>
};

export default FriendItem;
