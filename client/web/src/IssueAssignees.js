import React, { Component } from 'react';
import IssueAssignee from './IssueAssignee.js';

const IssueAssignees = ({ assignees }) => {
  const assigneeItems = assignees.map((v, i) => {
    console.log(v);
    return <IssueAssignee key={i} assignee={v} />;
  });
  return <div className="IssueAssignees">{assigneeItems}</div>;
};

export default IssueAssignees;
