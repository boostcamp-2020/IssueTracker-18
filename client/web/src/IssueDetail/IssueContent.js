import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CommentContainer from './CommentContainer';
import SideMenuContainer from './SideMenuContainer';
import CommentCreate from './CommentCreate';

const IssueContentStyle = styled.div`
  display: flex;
  flex-direction: row;
`;

const IssueContent = () => {
  return (
    <div>
      <IssueContentStyle>
        <CommentContainer />
        <SideMenuContainer />
      </IssueContentStyle>
      <CommentCreate />
    </div>
  );
};

export default IssueContent;
