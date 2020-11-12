import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import styled, { createGlobalStyle } from 'styled-components';

import Login from './Login/Login';
import IssueList from './IssueList/IssueList.js';

const GlobalStyle = createGlobalStyle`
  * {
    // color: ${props => (props.whiteColor ? 'white' : 'black')};
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
  }

  :root{
    --color-border-primary:#e1e4e8;
    --hover-item-color:#f6f8fa;
  }
`;

const HeaderStyle = styled.h1`
  padding: 30px 0;
  background-color: #24292f;
  text-align: center;
  color: white;
  height: 120px;
`;

const AppStyle = styled.div`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none !important;
  font-family: Arial, Helvetica, sans-serif;
`;

const App = props => {
  return (
    <Router>
      <AppStyle className="App">
        <GlobalStyle />
        <HeaderStyle>📓ISSUES</HeaderStyle>
        <nav>
          <Link to="/">
            <button>Login</button>
          </Link>
          <Link to="/issueList">
            <button>IssueList</button>
          </Link>
        </nav>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/issueList">
            <IssueList />
          </Route>
        </Switch>
      </AppStyle>
    </Router>
  );
};

export default App;