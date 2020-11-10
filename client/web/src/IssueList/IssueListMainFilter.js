import React, { useState, useEffect } from 'react';
import DropDownModelListContainer from './DropDownModelListContainer.js';
import styled from 'styled-components';

const IssueListMainFilterStyle = styled.div`
  border: 1px solid var(--color-border-primary);
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
      <div className="IssueList__list__filter__checkbox-info">
        <div className="IssueList__list__filter__checkbox">All checkbox</div>
        <div className="IssueList__list__filter__checkbox">X selected</div>
      </div>
      <IssueListMainFilterSyntaxStyle className="IssueList__list__filter__syntax">
        <DropDownModelListContainer model={'author'} />
        <DropDownModelListContainer model={'label'} />
        <DropDownModelListContainer model={'milestone'} />
        <DropDownModelListContainer model={'assignee'} />
        <button className="IssueList__list__filter__syntax__button">sort</button>
      </IssueListMainFilterSyntaxStyle>
    </IssueListMainFilterStyle>
  );
};

export default IssueListMainFilter;
