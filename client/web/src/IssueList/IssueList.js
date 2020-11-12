import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { useAuthContext } from '../auth';
import IssueListMain from './IssueListMain.js';
import IssueListHeader from './IssueListHeader.js';

const IssueListStyle = styled.main`
  margin: 32px;
`;

const IssueList = props => {
  const auth = useAuthContext();
  return (
    <IssueListStyle className="IssueList">
      {auth.user ? null : <Redirect to="/login" />}
      <IssueListHeader />
      <IssueListMain />
    </IssueListStyle>
  );
};

export default IssueList;
