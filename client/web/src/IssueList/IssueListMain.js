import React, { useState, useEffect } from 'react';
import Issue from './Issue.js';
import IssueListMainFilter from './IssueListMainFilter.js';

const IssueListMain = props => {
  return (
    <section className="IssueList__list">
      <IssueListMainFilter />
      <Issue />
    </section>
  );
};

export default IssueListMain;
