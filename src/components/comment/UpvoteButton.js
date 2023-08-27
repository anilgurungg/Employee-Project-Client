import React from 'react';
import { IconButton } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';

function UpvoteButton({ onClick , hasUpVoted }) {
  return <IconButton onClick={onClick} aria-label="downvote" color='primary'>
  {console.log("Upvote Button" ,hasUpVoted)}
 {hasUpVoted ? <Favorite/>  : <FavoriteBorder />}
</IconButton>;
}

export default UpvoteButton;
