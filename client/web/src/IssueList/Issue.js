import React, { useState, useEffect } from 'react';
import IssueTitle from './IssueTitle.js';
import IssueAuthor from './IssueAuthor.js';
import IssueMilestone from './IssueMilestone.js';
import IssueLabels from './IssueLabels.js';
import IssueAssignees from './IssueAssignees.js';
import IssueCheckbox from './IssueCheckbox.js';
import styled from 'styled-components';

const IssueStyle = styled.li`
  border: 1px solid var(--color-border-primary);
  &:hover {
    background-color: #f6f8fa;
  }
`;

const Issue = () => {
  const [issues, setIssue] = useState([]);

  const fetchInitialData = async url => {
    const data = await fetch(url);
    const issueJson = await data.json();
    setIssue(issueJson);
  };

  useEffect(() => {
    fetchInitialData('http://localhost:8080/api/issue?isOpen=true');
  }, []);

  const issueItems = issues.map((issue, index) => (
    <IssueStyle key={'Issue' + issue.id} className="Issue">
      {/* <IssueCheckbox key={'IssueCheckbox' + index} /> */}
      <IssueTitle key={'IssueTitle' + issue.id} title={issue.title} />
      <IssueAuthor
        key={'IssueAuthor' + issue.id}
        creater={issue.creater === null ? { email: 'creater없음' } : issue.creater}
      />
      <IssueMilestone
        key={'IssueMilestone' + issue.id}
        milestone={issue.milestone === null ? { title: '이름 없는 마일스톤' } : issue.milestone}
      />
      <IssueLabels
        key={'IssueLabels' + issue.id}
        labels={issue.labels.length === 0 ? [{ title: '이름없는 label' }] : issue.labels}
      />
      <IssueAssignees
        key={'IssueAssignees' + issue.id}
        assignees={
          issue.assignees.length === 0 ? [{ email: '이름없는 assignee' }] : issue.assignees
        }
      />
    </IssueStyle>
  ));

  return <ul className="IssueListContainer">{issueItems}</ul>;
};

export default Issue;
