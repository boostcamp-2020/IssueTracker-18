import React from 'react';

const IssueAuthor = ({ issueId, creater }) => {
  return <div className="IssueAuthor">{creater.name}</div>;
};

export default IssueAuthor;
