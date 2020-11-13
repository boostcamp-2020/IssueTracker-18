import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import DropDownFilterListContainer from '../molecules/DropDownFilterListContainer';
import TextArea from '../atoms/TextArea';
import Button from '../atoms/Button';
import LabelMilestoneNav from '../LabelMilestone/LabelMilestoneNav';

const StyledIssueListHeader = styled.section`
  display: flex;
  justify-content: space-between;
  height: 38px;
  margin-bottom: 20px;
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
        <LabelMilestoneNav />
        <Button buttonTitle={'New issue'} />
      </StyledIssueListHeaderRight>
    </StyledIssueListHeader>
  );
};

export default IssueListHeader;
