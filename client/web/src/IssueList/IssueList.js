import React, { useState, useEffect } from 'react';
import IssueListMain from './IssueListMain.js';
import IssueListHeader from './IssueListHeader.js';
import styled from 'styled-components';

const IssueListStyle = styled.main`
  margin: 32px;
`;

const IssueList = props => {
  return (
    <IssueListStyle className="IssueList">
      <IssueListHeader />
      <IssueListMain />
    </IssueListStyle>
  );
};

export default IssueList;
