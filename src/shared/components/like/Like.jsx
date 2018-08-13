import React from 'react';

import { Checkbox } from '@material-ui/core';
import { FavoriteBorder, Favorite } from '@material-ui/icons';


const Like = (props) => {
  const { liked, handleLike, parentId } = props;
  const handleChange = (e, checked) => {
    handleLike(checked, parentId);
  }

  return <div className="like">
    <Checkbox
      checked={liked}
      icon={<FavoriteBorder />} 
      checkedIcon={<Favorite />}
      onChange={handleChange}
    />
  </div>
};

export default Like;
