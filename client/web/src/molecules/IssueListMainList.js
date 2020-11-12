import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import IssueTitle from '../atoms/IssueTitle';
import IssueAuthor from '../atoms/IssueAuthor';
import IssueMilestone from '../atoms/IssueMilestone';
import IssueLabels from '../atoms/IssueLabels';
import IssueAssignees from '../atoms/IssueAssignees';
import IssueMetaInfo from '../atoms/IssueMetaInfo';
import Checkbox from '../atoms/Checkbox';

import { IssueContext } from '../IssueList/IssueList';

const StyledIssueItem = styled.li`
  border: 1px solid var(--color-border-primary);
  &:hover {
    background-color: var(--hover-item-color);
  }
  padding: 16px;
`;

const StyledIssueUp = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledIssueUpLeft = styled.div`
  display: flex;
`;

const StyledIssueDown = styled.div`
  display: flex;
  padding-left: 5px;
  padding-top: 10px;
  div {
    font-size: 12px;
  }
`;

const IssueListMainList = () => {
  const issues = useContext(IssueContext);

  const issueItems = issues
    .map((issue, index) => (
      <StyledIssueItem key={`Issue ${issue.id}`} className="Issue">
        <StyledIssueUp>
          <StyledIssueUpLeft>
            <Checkbox key={`IssueCheckbox ${issue.id}`} />
            <IssueTitle key={`IssueTitle ${issue.id}`} issueId={issue.id} title={issue.title} />
            <IssueLabels
              key={`IssueLabels ${issue.id}`}
              labels={issue.labels.length === 0 ? [{ title: '이름없는 label' }] : issue.labels}
            />
          </StyledIssueUpLeft>
          <IssueAssignees
            key={`IssueAssignees ${issue.id}`}
            assignees={
              issue.assignees.length === 0 ? [{ email: '이름없는 assignee' }] : issue.assignees
            }
          />
        </StyledIssueUp>
        <StyledIssueDown>
          <IssueMetaInfo
            key={`IssueMetaInfo ${issue.id}`}
            issueId={issue.id}
            isOpen={issue.isOpen}
          ></IssueMetaInfo>
          <IssueAuthor
            key={`IssueAuthor ${issue.id}`}
            creater={issue.creater === null ? { email: 'creater없음' } : issue.creater}
          />
          <IssueMilestone
            key={`IssueMilestone ${issue.id}`}
            milestone={issue.milestone === null ? { title: '이름 없는 마일스톤' } : issue.milestone}
          />
        </StyledIssueDown>
      </StyledIssueItem>
    ))
    .reverse();

  return <ul className="IssueListContainer">{issueItems}</ul>;
};

export default IssueListMainList;
