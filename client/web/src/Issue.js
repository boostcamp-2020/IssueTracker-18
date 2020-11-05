import React, { Component } from 'react';
import IssueTitle from './IssueTitle.js';
import IssueAuthor from './IssueAuthor.js';
import IssueMilestone from './IssueMilestone.js';
import IssueLabels from './IssueLabels.js';
import IssueAssignees from './IssueAssignees.js';
import IssueCheckbox from './IssueCheckbox.js';

const Issue = ({ issues }) => {
  const issueItems = issues.map((issue, index) => (
    <li key={'Issue' + index} className="Issue">
      {/* <IssueCheckbox key={'IssueCheckbox' + index} /> */}
      <IssueTitle key={'IssueTitle' + index} title={issue.title} />
      <IssueAuthor
        key={'IssueAuthor' + index}
        creater={issue.creater === null ? { email: 'creater없음' } : issue.creater}
      />
      <IssueMilestone
        key={'IssueMilestone' + index}
        milestone={issue.milestone === null ? { title: '이름 없는 마일스톤' } : issue.milestone}
      />
      <IssueLabels
        key={'IssueLabels' + index}
        labels={issue.labels.length === 0 ? [{ title: '이름없는 label' }] : issue.labels}
      />
      <IssueAssignees
        key={'IssueAssignees' + index}
        assignees={
          issue.assignees.length === 0 ? [{ email: '이름없는 assignee' }] : issue.assignees
        }
      />
    </li>
  ));

  return issueItems;
};

export default Issue;
