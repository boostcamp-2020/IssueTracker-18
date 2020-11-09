import React from 'react';
import IssueAssignee from './IssueAssignee.js';

const IssueAssignees = ({ assignees }) => {
  const assigneeItems = assignees.map((v, i) => {
    return <IssueAssignee key={i} assignee={v} />;
  });
  return <div className="IssueAssignees">{assigneeItems}</div>;
};

export default IssueAssignees;
