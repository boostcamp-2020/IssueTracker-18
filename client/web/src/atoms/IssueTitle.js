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
  const baseUrl = 'http://localhost:3000';
  const routeUrl = `/issueList/${issueId}`;
  const url = `${baseUrl}${routeUrl}`;
  return (
    <Router>
      <Link to={routeUrl}>
        <StyledIssueTitle>{title}</StyledIssueTitle>
      </Link>
      <Route path={routeUrl}>
        <div></div>
      </Route>
    </Router>
  );
};

export default IssueTitle;
