import React, { useState, useEffect } from 'react';
import IssueListContainer from './IssueListContainer.js';

const IssueList = (props) => {
  return (
    <div className="IssueList">
      <section className="IssueList__header">
        <div className="IssueList__header__filter">
          <div className="IssueList__header__filter__syntax">syntax</div>
          <div className="IssueList__header__filter__contents">contents</div>
        </div>
        <button className="IssueList__header__labels">labels</button>
        <button className="IssueList__header__milestones">milestones</button>
        <button className="IssueList__header__new-issue">new issue</button>
      </section>
      <section className="IssueList__list">
        <div className="IssueList__list__filter">
          <div className="IssueList__list__filter__checkbox">checkbox</div>
          <div className="IssueList__list__filter__author">author</div>
          <div className="IssueList__list__filter__label">label</div>
          <div className="IssueList__list__filter__milestone">milestone</div>
          <div className="IssueList__list__filter__assignee">assignee</div>
        </div>
        <IssueListContainer />
      </section>
    </div>
  );
};

export default IssueList;
