import React from 'react';
import { IconButton } from '@mui/material';
import { HeartBrokenOutlined, HeartBroken } from '@mui/icons-material';

function DownvoteButton({ onClick, hasDownVoted }) {
  return <IconButton onClick={onClick} aria-label="downvote" color='error'>
     {console.log("Downvote Button" ,hasDownVoted)}
    { hasDownVoted ? <HeartBroken/> : <HeartBrokenOutlined /> } 
</IconButton>;
}

export default DownvoteButton;
