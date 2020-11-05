import React, { Component } from 'react';

const IssueAuthor = ({ creater }) => {
  return (
    <div className="IssueAuthor">
      <span>{creater.email}</span>
    </div>
  );
};

export default IssueAuthor;
