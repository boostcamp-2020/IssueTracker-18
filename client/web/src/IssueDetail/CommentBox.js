import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CommentBoxStyle = styled.div`
  width: 600px;
  border: 1px solid #d1d5da;
  margin-bottom: 5px;
`;

const CommentTitleStyle = styled.div`
  background-color: ${props => props.color};
  height: 50px;
  padding: 17px 10px;
`;

const CommentTitleEditStyle = styled.span`
  float: right;
`;

const CommentContentStyle = styled.div`
  background-color: white;
  min-height: 150px;
  max-height: 150px;
`;

const CommentBox = ({ isFirst }) => {
  const CommentBoxByState = isFirst => {
    if (isFirst) {
      return (
        <CommentBoxStyle>
          <CommentTitleStyle color="#d1d5da">
            hello
            <CommentTitleEditStyle>Edit</CommentTitleEditStyle>
          </CommentTitleStyle>
          <CommentContentStyle>첫번 째</CommentContentStyle>
        </CommentBoxStyle>
      );
    } else if (!isFirst) {
      return (
        <CommentBoxStyle>
          <CommentTitleStyle color="#d1d5da">hello</CommentTitleStyle>
          <CommentContentStyle>첫번 째 아닌거</CommentContentStyle>
        </CommentBoxStyle>
      );
    }
  };
  return CommentBoxByState(isFirst);
};

export default CommentBox;
