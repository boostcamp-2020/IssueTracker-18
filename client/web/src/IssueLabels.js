import React, { Component } from 'react';
import IssueLabel from './IssueLabel.js';

const IssueLabels = ({ labels }) => {
  const labelItems = labels.map((v, i) => <IssueLabel key={i} label={v} />);
  return <div className="IssueLabels">{labelItems}</div>;
};

export default IssueLabels;
