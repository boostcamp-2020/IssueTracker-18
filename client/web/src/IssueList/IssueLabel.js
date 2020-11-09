import React from 'react';

const IssueLabel = ({ label }) => {
  return (
    <div className="IssueLabel">
      <span>{label.title}</span>
    </div>
  );
};

export default IssueLabel;
