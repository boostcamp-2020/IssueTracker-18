import React from 'react';

const CommentContext = React.createContext();

const commentReducer = (comment, { type, payload }) => {
  switch (type) {
    case 'addComment':
      return [...comment, payload];
    case 'setComments':
      return [...payload];

    case 'updateComment':
      return comment.map(v => (v.id === payload.id ? payload : v));

    default:
      break;
  }
};

const IssueContext = React.createContext();

const issueReducer = (issue, { type, payload }) => {
  switch (type) {
    case 'updateTitle':
      return { ...issue, title: payload };
    case 'updateIsOpen':
      return { ...issue, isOpen: payload };
    case 'setIssue':
      return { ...issue, ...payload };
    default:
      break;
  }
};

const CreaterContext = React.createContext();

const createrReducer = (creater, { type, payload }) => {
  switch (type) {
    case 'setCreater':
      return { ...creater, ...payload };
    default:
      break;
  }
};

export {
  CommentContext,
  commentReducer,
  IssueContext,
  issueReducer,
  CreaterContext,
  createrReducer,
};
