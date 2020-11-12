import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import DropDownFilterListContainer from '../molecules/DropDownFilterListContainer';
import TextArea from '../atoms/TextArea';

const StyledIssueListHeader = styled.section`
  display: flex;
  justify-content: space-between;
`;

const StyledIssueListHeaderFilter = styled.div`
  display: flex;
`;

const IssueListHeader = props => {
  return (
    <StyledIssueListHeader className="IssueList__header">
      <StyledIssueListHeaderFilter className="IssueList__header__filter">
        <DropDownFilterListContainer />
        <TextArea />
      </StyledIssueListHeaderFilter>
      <div className="IssueList__header__button">
        <button className="IssueList__header__labels">labels</button>
        <button className="IssueList__header__milestones">milestones</button>
        <button className="IssueList__header__new-issue">new issue</button>
      </div>
    </StyledIssueListHeader>
  );
};

export default IssueListHeader;
