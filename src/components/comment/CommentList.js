
import { useEffect, useState } from 'react';
import { useCommentContext } from '../../context/CommentContext';
import { useUserContext } from '../../context/UserContext';
import Comment from './Comment';
import NewCommentForm from './NewCommentForm';
import { Paper } from '@mui/material';

function CommentList({ projectId, ticketId }) {
  const { comments, page, size, totalElements, fetchComments, error, dispatch } = useCommentContext();
  const { currentUser } = useUserContext();
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchComments(projectId, ticketId)
      .catch(err => {
        dispatch({ type: 'SET_ERROR', payload: err });
      })
      .finally(() => setIsLoading(false));

  }, [projectId, ticketId, dispatch]);


  return (
      <Paper  style={{ flex: 1, overflow: 'auto', padding: "40px 20px" , height: 400,}}>
        <div style={{marginBottom:30}}>
      <NewCommentForm projectId={projectId} ticketId={ticketId} />
      </div>
        <div style={{ width: '100%' }}>
          {loading ? <p> Loading..</p> : (comments.length > 0 ? (comments.map((comment) => (
            <Comment key={comment.commentId} comment={comment} />
          ))) : <p>No Comments</p>)}
        </div>
      </Paper>
  );
}

export default CommentList;
