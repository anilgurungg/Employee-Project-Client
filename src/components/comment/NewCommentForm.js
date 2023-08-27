import React, { useState } from 'react';
import { useCommentContext } from '../../context/CommentContext';
import { Button, TextField } from '@mui/material';

function NewCommentForm({ projectId, ticketId }) {
  const { addComment } = useCommentContext();
  const [newComment, setNewComment] = useState('');

  const handleAddComment = async () => {
    if (newComment.trim() !== '') {
      await addComment(projectId, ticketId, newComment);
      setNewComment('');
    }
  }

  return (
    <div style={{  alignItems:"center", justifyContent:'space-between', display:"flex", flexDirection:"row" }}>
      <TextField
        label="Add a new comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        fullWidth
        multiline
        rows={3}
        variant="outlined"
      />
      <Button variant="contained" onClick={handleAddComment} style={{marginLeft:'10px', fontSize:'10px'}} >Add Comment</Button>
    </div>
  );
}

export default NewCommentForm;
