import React, { useState, useEffect } from 'react';
import CommentContainer from './CommentContainer';
import SideMenuContainer from './SideMenuContainer';
import styled from 'styled-components';

const IssueContentStyle = styled.div`
  display: flex;
  flex-direction: row;
`;

const IssueContent = () => {
  return (
    <IssueContentStyle>
      <CommentContainer />
      <SideMenuContainer />
    </IssueContentStyle>
  );
};

export default IssueContent;
