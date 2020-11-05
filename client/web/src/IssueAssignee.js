import React, { Component } from 'react';

const IssueAssignee = ({ assignee }) => {
  return (
    <div className="IssueAssignee">
      <span>{assignee.email}</span>
    </div>
  );
};

export default IssueAssignee;
