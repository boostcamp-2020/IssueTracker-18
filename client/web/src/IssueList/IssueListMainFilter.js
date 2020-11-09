import React, { useState, useEffect } from 'react';
import AssigneeListContainer from './AssigneeListContainer.js';
import styled from 'styled-components';

const IssueListMainFilterStyle = styled.div`
  background-color: #f6f8fa;
  display: flex;
  justify-content: space-between;
  height: 55px;
  padding: 16px;
`;

const IssueListMainFilterSyntaxStyle = styled.div`
  display: flex;
`;

const IssueListMainFilter = props => {
  return (
    <IssueListMainFilterStyle className="IssueList__list__filter">
      <div className="IssueList__list__filter__checkbox">All checkbox</div>
      <IssueListMainFilterSyntaxStyle className="IssueList__list__filter__syntax">
        <button className="IssueList__list__filter__syntax__button">author</button>
        <button className="IssueList__list__filter__syntax__button">label</button>
        <button className="IssueList__list__filter__syntax__button">milestone</button>
        <AssigneeListContainer color="blue" />
        <button className="IssueList__list__filter__syntax__button">sort</button>
      </IssueListMainFilterSyntaxStyle>
    </IssueListMainFilterStyle>
  );
};

export default IssueListMainFilter;
