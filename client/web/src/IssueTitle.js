import React, { Component } from 'react';

const IssueTitle = (props) => {
  return (
    <div className="IssueTitle">
      <span>{props.title}</span>
    </div>
  );
};

export default IssueTitle;
