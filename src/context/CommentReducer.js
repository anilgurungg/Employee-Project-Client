// CommentReducer.js

const CommentReducer = (state, action) => {
  switch (action.type) {
    case 'SET_COMMENTS':
    
      return {
        ...state,
        comments: action.payload.content,
        page: action.payload.page,
        size: action.payload.size,
        totalElements: action.payload.totalElements,
        totalPages: action.payload.totalPages
      };
    case 'ADD_COMMENT':
    
      return {
        ...state,
        comments: [action.payload, ...state.comments]
      };
    case 'DELETE_COMMENT':
     
      const commentIdToDelete = action.payload;
      const updatedComments = state.comments.filter(comment => comment.commentId !== commentIdToDelete);
      return {
        ...state,
        comments: updatedComments
      };
      case 'EDIT_COMMENT':
      // Find the index of the edited comment in the state
      const editedCommentIndex = state.comments.findIndex(comment => comment.commentId === action.payload.commentId);

      // Create a new comment object with updated data
      const updatedComment = {
        ...state.comments[editedCommentIndex],
        text: action.payload.text,
        updatedAt: action.payload.updatedAt,
        updated_by: action.payload.updated_by,
      };

      // Create a new state with the updated comment
      const updatedState = {
        ...state,
        comments: [
          ...state.comments.slice(0, editedCommentIndex),
          updatedComment,
          ...state.comments.slice(editedCommentIndex + 1),
        ],
      };

      return updatedState;
      case 'UPDATE_VOTES':
      const updatedCommentWithVotes = action.payload;
      const updatedCommentsWithVotes = state.comments.map(comment => {
        if (comment.commentId === updatedCommentWithVotes.commentId) {
          return updatedCommentWithVotes; // Use the updated comment directly
        }
        return comment;
      });
      return {
        ...state,
        comments: updatedCommentsWithVotes
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default CommentReducer;
