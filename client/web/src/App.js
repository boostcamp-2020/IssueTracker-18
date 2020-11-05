import React, { Component } from 'react';
import './App.css';
import Login from './Login.js';
import IssueList from './IssueList.js';
import Test from './Test.js';

const App = (props) => {
  console.log('App');
  return (
    <div className="App">
      <h1> Issue Tracker </h1>
      {/* <Login /> */}
      <IssueList />
      {/* <Test /> */}
    </div>
  );
};

export default App;
