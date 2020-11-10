import React, { useState, useEffect } from 'react';
import ButtonComponent from './ButtonComponent';
import styled from 'styled-components';

const CommentCreateButtonStyle = styled.div`
  float: right;
`;

const CommentCreateButton = () => {
  return (
    <CommentCreateButtonStyle>
      <ButtonComponent color="black" backgroundColor="#fafbfc" name="Close issue"></ButtonComponent>
      <ButtonComponent color="white" backgroundColor="#28a745" name="Comment"></ButtonComponent>
    </CommentCreateButtonStyle>
  );
};

export default CommentCreateButton;
