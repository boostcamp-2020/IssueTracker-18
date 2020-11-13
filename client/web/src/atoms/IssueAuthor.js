import React from 'react';
import styled from 'styled-components';

const StyledIssueAuthor = styled.div`
  padding-left: 5px;
`;

const IssueAuthor = ({ issueId, creater }) => {
  return <StyledIssueAuthor className="IssueAuthor">{creater.name}</StyledIssueAuthor>;
};

export default IssueAuthor;
