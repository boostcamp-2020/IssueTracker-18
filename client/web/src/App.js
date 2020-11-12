import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Login from './Login/Login.js';
import IssueList from './IssueList/IssueList.js';
import { LabelMilestoneRootContainer } from './LabelMilestone/LabelMilestoneRootContainer';
import { AuthProvider } from './auth';

const GlobalStyle = createGlobalStyle`
  * {
    // color: ${props => (props.whiteColor ? 'white' : 'black')};
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
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
  text-decoration: none;
  font-family: Arial, Helvetica, sans-serif;
`;

const App = props => {
  return (
    <AuthProvider>
      <Router>
        <AppStyle className="App">
          <GlobalStyle />
          <HeaderStyle>📓ISSUES</HeaderStyle>

          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/label">
              <LabelMilestoneRootContainer />
            </Route>
            <Route path="/">
              <Link to="/label">레이블보기</Link>
              <IssueList />
            </Route>
          </Switch>
        </AppStyle>
      </Router>
    </AuthProvider>
  );
};

export default App;
