import React from 'react';
import styled from 'styled-components';

const StyledIssueLabels = styled.div`
  display: flex;
`;
const StyledIssueLabel = styled.div`
  background-color: ${props => props.color};
  padding: 0 7px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  border: 1px solid transparent;
  border-radius: 2em;
`;
const IssueLabels = ({ labels, color }) => {
  const labelItems = labels.map((v, i) => (
    <StyledIssueLabel color={v.color} key={i}>
      {' '}
      {v.title}{' '}
    </StyledIssueLabel>
  ));
  return <StyledIssueLabels>{labelItems}</StyledIssueLabels>;
};

export default IssueLabels;
