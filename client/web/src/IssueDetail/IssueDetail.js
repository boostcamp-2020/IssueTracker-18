import React, { useState, useEffect } from 'react';
import IssueContent from './IssueContent';
import IssueTitle from './IssueTitle';
import CommentCreate from './CommentCreate';
import styled from 'styled-components';

const IssueDetailStyle = styled.div`
  padding: 20px;
`;

const IssueDetail = () => {
  return (
    <IssueDetailStyle>
      <IssueTitle title="hello" issueId="1" isOpen={true}></IssueTitle>
      <IssueContent />
      <CommentCreate />
    </IssueDetailStyle>
  );
};

export default IssueDetail;
