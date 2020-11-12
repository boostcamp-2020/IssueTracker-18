import React from 'react';
import styled from 'styled-components';
import CommentContainer from './CommentContainer';
import SideMenuContainer from './SideMenuContainer';
import CommentCreate from './CommentCreate';

const IssueContentStyle = styled.div`
  display: flex;
  flex-direction: row;
`;

const IssueContent = ({ firstComment, setFirstComment }) => {
  return (
    <div>
      <IssueContentStyle>
        <CommentContainer firstComment={firstComment} setFirstComment={setFirstComment} />
        <SideMenuContainer />
      </IssueContentStyle>
      <CommentCreate />
    </div>
  );
};

export default IssueContent;
