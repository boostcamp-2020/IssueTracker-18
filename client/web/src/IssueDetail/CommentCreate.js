import React from 'react';
import styled from 'styled-components';
import CommentCreateButton from './CommentCreateButton';

const CommentCreateStyle = styled.div`
  width: 800px;
`;

const CommentCreateTextArea = styled.textarea`
  display: block;
  width: 100%;
  min-height: 100px;
  max-height: 500px;
  padding: 8px;
  border: 1px solid #d1d5da;
  border-radius: 10px;
`;

const CommentCreate = () => {
  return (
    <CommentCreateStyle>
      <CommentCreateTextArea id="commentCreateTextArea" />
      <CommentCreateButton />
    </CommentCreateStyle>
  );
};

export default CommentCreate;
