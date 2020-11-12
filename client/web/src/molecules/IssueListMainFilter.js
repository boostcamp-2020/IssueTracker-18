import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DropDownModelListContainer from './DropDownModelListContainer';
import Checkbox from '../atoms/Checkbox';

const StyledIssueListMainFilter = styled.div`
  border: 1px solid var(--color-border-primary);
  background-color: #f6f8fa;
  display: flex;
  justify-content: space-between;
  height: 55px;
  padding: 16px;
`;

const StyledIssueListMainFilterCheckbox = styled.div`
  display: flex;
`;

const StyledIssueListMainFilterSyntax = styled.div`
  display: flex;
`;

const IssueListMainFilter = props => {
  return (
    <StyledIssueListMainFilter className="IssueList__list__filter">
      <StyledIssueListMainFilterCheckbox className="IssueList__list__filter__checkbox-info">
        <Checkbox />
        <div className="IssueList__list__filter__checkbox">X selected</div>
      </StyledIssueListMainFilterCheckbox>
      <StyledIssueListMainFilterSyntax className="IssueList__list__filter__syntax">
        <DropDownModelListContainer model={'author'} />
        <DropDownModelListContainer model={'label'} />
        <DropDownModelListContainer model={'milestone'} />
        <DropDownModelListContainer model={'assignee'} />
        <button className="IssueList__list__filter__syntax__button">sort</button>
      </StyledIssueListMainFilterSyntax>
    </StyledIssueListMainFilter>
  );
};

export default IssueListMainFilter;
