import React, { createContext, useContext, useReducer } from 'react';
import CommentService from '../services/commentService';
import CommentReducer from './CommentReducer';

const CommentContext = createContext();



export function CommentProvider({ children }) {
  const initialState = {
    comments: [], // Array to store comments
    page: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
    error: null,
  };
  
  const [state, dispatch] = useReducer(CommentReducer, initialState);
  

  const fetchComments = async (projectId, ticketId) => {
    try {
      const response = await CommentService.getCommentsForTicket( projectId, ticketId);
    dispatch({ type: 'SET_COMMENTS', payload:response.data });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error });
    }
    
  };

  const addComment = async (projectId, ticketId, text) => {
    const response = await CommentService.addCommentToTicket(projectId, ticketId, text);
    if (response) {
      console.log(response);
      dispatch({ type: 'ADD_COMMENT', payload: response.data });
    }
  };
  const deleteComment = async (projectId, ticketId, commentId) => {
    const response = await CommentService.removeCommentFromTicket(projectId, ticketId,commentId);
    if (response) {
      console.log(response);
      dispatch({ type: 'DELETE_COMMENT', payload: commentId });
    }
  };

  const editComment = async (projectId, ticketId, commentId, text) => {
    const response = await CommentService.editComment(projectId, ticketId,commentId, text);
    if (response) {
      console.log(response);
      dispatch({ type: 'EDIT_COMMENT', payload: response.data });
    }
  };

  const voteComment = async (commentId, voteType) => {
    const response = await CommentService.voteComment(commentId, voteType);
    if (response) {
      dispatch({ type: 'UPDATE_VOTES', payload: response.data });
    }
  };

  const unvoteComment = async (commentId) => {
    const response = await CommentService.unvoteComment(commentId);
    if (response) {
      dispatch({ type: 'UPDATE_VOTES', payload: response.data });
    }
  };

  return (
    <CommentContext.Provider  value={{
      comments: state.comments,
      page: state.page,
      size: state.size,
      totalElements: state.totalElements,
      totalPages: state.totalPages,
      error: state.error,
      dispatch,
      fetchComments,
      addComment,
      deleteComment,
      editComment,
      voteComment,
      unvoteComment
    }}>
      {children}
    </CommentContext.Provider>
  );
}

export function useCommentContext() {
  return useContext(CommentContext);
}
