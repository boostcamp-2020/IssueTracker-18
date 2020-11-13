import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledIssueTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  vertical-align: middle;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif,
    Apple Color Emoji, Segoe UI Emoji;
  text-decoration: none;
`;

const IssueTitle = ({ issueId, title }) => {
  const routeUrl = `/issueList/${issueId}`;
  return (
    <Link to={routeUrl}>
      <StyledIssueTitle>{title}</StyledIssueTitle>
    </Link>
  );
};

export default IssueTitle;
