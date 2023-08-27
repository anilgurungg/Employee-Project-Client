import React from 'react';
import { Button, CardActions } from '@mui/material';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import UpvoteButton from './UpvoteButton';
import DownvoteButton from './DownvoteButton';

function CommentActions({ comment, onEdit, onDelete, onUpvote, onDownvote }) {
  return (
    <CardActions>
      <EditButton comment={comment} onEdit={onEdit} />
      <DeleteButton onDelete={onDelete} />
      <UpvoteButton onUpVote={onUpvote} />
      <DownvoteButton onDownvote={onDownvote} />
    </CardActions>
  );
}

export default CommentActions;
