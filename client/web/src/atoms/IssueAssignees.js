import React from 'react';
import styled from 'styled-components';

const StyledIssueAssignees = styled.div`
  display: flex;
`;

const StyledIssueAssignee = styled.div`
  margin-left: 5px;
`;

const IssueAssignees = ({ assignees }) => {
  const assigneeItems = assignees.map((v, i) => {
    return <StyledIssueAssignee key={i}> {v.name} </StyledIssueAssignee>;
  });
  return <StyledIssueAssignees className="IssueAssignees">{assigneeItems}</StyledIssueAssignees>;
};

export default IssueAssignees;
