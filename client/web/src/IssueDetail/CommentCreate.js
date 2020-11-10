import React, { useState, useEffect } from 'react';
import CommentCreateButton from './CommentCreateButton';
import styled from 'styled-components';

const CommentCreateStyle = styled.div`
  width: 600px;
  border: 1px solid #d1d5da;
`;

const CommentCreateTextArea = styled.textarea`
  display: block;
  width: 100%;
  min-height: 100px;
  max-height: 500px;
  padding: 8px;
`;

const CommentCreate = () => {
  return (
    <CommentCreateStyle>
      <CommentCreateTextArea />
      <CommentCreateButton />
    </CommentCreateStyle>
  );
};

export default CommentCreate;
