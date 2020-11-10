import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DropDownFilterListContainer from './DropDownFilterListContainer.js';

const IssueListHeaderStyle = styled.section`
  display: flex;
  justify-content: space-between;
`;

const IssueListHeaderFilterStyle = styled.div`
  display: flex;
`;

const IssueListHeader = props => {
  return (
    <IssueListHeaderStyle className="IssueList__header">
      <IssueListHeaderFilterStyle className="IssueList__header__filter">
        <DropDownFilterListContainer />
        <div className="IssueList__header__filter__search-area">search area</div>
      </IssueListHeaderFilterStyle>
      <div className="IssueList__header__button">
        <button className="IssueList__header__labels">labels</button>
        <button className="IssueList__header__milestones">milestones</button>
        <button className="IssueList__header__new-issue">new issue</button>
      </div>
    </IssueListHeaderStyle>
  );
};

export default IssueListHeader;
