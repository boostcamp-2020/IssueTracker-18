import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import DropDownFilterListContainer from '../molecules/DropDownFilterListContainer';
import TextArea from '../atoms/TextArea';
import Button from '../atoms/Button';

const StyledIssueListHeader = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const StyledIssueListHeaderLeft = styled.div`
  display: flex;
`;

const StyledIssueListHeaderRight = styled.div`
  display: flex;
`;

const IssueListHeader = props => {
  return (
    <StyledIssueListHeader>
      <StyledIssueListHeaderLeft>
        <DropDownFilterListContainer />
        <TextArea />
      </StyledIssueListHeaderLeft>
      <StyledIssueListHeaderRight>
        <button className="IssueList__header__labels">labels</button>
        <button className="IssueList__header__milestones">milestones</button>
        <Button buttonTitle={'New issue'} />
      </StyledIssueListHeaderRight>
    </StyledIssueListHeader>
  );
};

export default IssueListHeader;
