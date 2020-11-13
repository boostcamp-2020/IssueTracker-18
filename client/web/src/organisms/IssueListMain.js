import React from 'react';
import IssueListMainList from '../molecules/IssueListMainList';
import IssueListMainFilter from '../molecules/IssueListMainFilter';

const IssueListMain = props => {
  return (
    <section className="IssueList__list">
      <IssueListMainFilter />
      <IssueListMainList />
    </section>
  );
};

export default IssueListMain;
