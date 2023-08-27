import { useState } from 'react';
import { Card, Grid, Avatar, Divider, Stack, TextField, Button } from '@mui/material';
import CommentText from './CommentText';
import CommentActions from './CommentActions';
import { useCommentContext } from '../../context/CommentContext';
import { useUserContext } from '../../context/UserContext';
import TimeStampToDate from '../../utils/TimeStampToDate';
import UpvoteButton from './UpvoteButton';
import DownvoteButton from './DownvoteButton';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import ConfirmationModal from '../shared/ConfirmationModal';
import EmpImage from '../../images/emp.png';

function Comment({ comment }) {
  const { dispatch, deleteComment, editComment, voteComment, unvoteComment } = useCommentContext();
  const { currentUser } = useUserContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const currentUserVote = comment.votes.find(vote => vote.employeeId === currentUser.employeeId);
  const initialUserVoteType = currentUserVote ? currentUserVote.voteType : null;
  const [userVoteType, setUserVoteType] = useState(initialUserVoteType);



  const handleEditExit = () => {
    setIsEditing(false);
    setEditedText(comment.text);
  }

  const handleEditComment = () => {
    editComment(comment.projectId, comment.ticketId, comment.commentId, editedText);
    setIsEditing(false);
  };


  const handleDeleteComment = () => {
    deleteComment(comment.projectId, comment.ticketId, comment.commentId)
      .catch(err => {
        dispatch({ type: 'SET_ERROR', payload: err });
      })
      .finally(() => setIsDeleting(false));

  };

  const handleVote = (voteType) => {
    if (voteType === 'UPVOTE' || voteType === 'DOWNVOTE') {
      voteComment(comment.commentId, voteType)
        .catch(err => {
          dispatch({ type: 'SET_ERROR', payload: err });
        })
        .finally(() => setUserVoteType(voteType));
      console.log(userVoteType);
    } else if (voteType === 'UNVOTE') {
      unvoteComment(comment.commentId)
        .catch(err => {
          dispatch({ type: 'SET_ERROR', payload: err });
        });
      setUserVoteType(null);
    };

  };

  return (
    <>
      <Grid container wrap="nowrap" spacing={2} >

        <Grid item>
          <Avatar alt="User" src={EmpImage} />

        </Grid>

        <Grid justifyContent="left" item xs zeroMinWidth>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <h4 style={{ margin: 0, textAlign: "left" }}>{comment.createdBy}</h4>

            {comment.createdBy === currentUser.employeeId && (
              <Stack direction={'row'}>
                <EditButton onClick={() => setIsEditing(true)} />
                <DeleteButton onClick={() => setOpenConfirmation(true)} />
              </Stack>)}

          </Stack>
          {isEditing ? (
            <>
              <TextField
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                on
              />
              <Button onClick={handleEditComment}>Save</Button>
              <Button onClick={handleEditExit}>Discard</Button>
            </>
          ) :
            <p style={{ textAlign: "left" }}>
              {comment.text}{" "}
            </p>
          }
          <p>
            <UpvoteButton onClick={() => {
              if (userVoteType === 'UPVOTE') {
                handleVote('UNVOTE');
              } else {
                handleVote('UPVOTE');
              }
            }
            }
              hasUpVoted={userVoteType === 'UPVOTE'} />
            {comment.netVotes}
            <DownvoteButton
              onClick={() => {
                if (userVoteType === 'DOWNVOTE') {
                  handleVote('UNVOTE');
                } else {
                  handleVote('DOWNVOTE');
                }
              }}
              hasDownVoted={userVoteType === 'DOWNVOTE'} />
          </p>
          {comment.updatedAt === comment.createdAt ? (<p style={{ textAlign: "left", color: "gray" }}>
            posted  {<TimeStampToDate timestamp={comment.createdAt} />}
          </p>) : (<p style={{ textAlign: "left", color: "gray" }}>
            updated  <TimeStampToDate timestamp={comment.updatedAt} /> </p>)
          }
        </Grid>
      </Grid>
      <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      <ConfirmationModal
        open={openConfirmation}
        onClose={() => setOpenConfirmation(false)} // Close modal
        setOpen={setOpenConfirmation}
        onConfirm={() => {
          handleDeleteComment(); // Call the onDelete function passed as a prop
          setOpenConfirmation(false); // Close the modal after deletion
        }}
        name="comment"
      />
    </>
  );
}

export default Comment;
