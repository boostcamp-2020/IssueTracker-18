import React from 'react';
import Login from './Login/Login.js';
import IssueList from './IssueList/IssueList.js';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

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
    <AppStyle className="App">
      <GlobalStyle />
      <HeaderStyle>📓ISSUES</HeaderStyle>
      {/* <Login /> */}
      <IssueList />
    </AppStyle>
  );
};

export default App;
