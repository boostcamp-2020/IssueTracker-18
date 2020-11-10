import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import IsOpenBox from './IsOpenBox';
import ButtonComponent from './ButtonComponent';

const IssueTitleStyle = styled.span`
  font-size: 32px;
`;

const IssueIdStyle = styled.span`
  font-size: 32px;
  color: #6a737d;
`;

const IssueTitleTopStyle = styled.div`
  width: 100%;
  height: 80px;
`;

const IssueTitleBottomStyle = styled.div`
  width: 100%;
  height: 60px;
`;

const IssueTitle = ({ title, issueId, isOpen }) => {
  const [issueTitle, setTitle] = useState(title);
  const [isIssueOpen, setIssueOpen] = useState(isOpen);

  return (
    <div className="issueTitle">
      <IssueTitleTopStyle>
        <IssueTitleStyle> {issueTitle} </IssueTitleStyle>
        <IssueIdStyle> #{issueId} </IssueIdStyle>
        <ButtonComponent color="black" backgroundColor="#fafbfc" name="Edit"></ButtonComponent>
      </IssueTitleTopStyle>
      <IssueTitleBottomStyle>
        <IsOpenBox isOpen={isIssueOpen}></IsOpenBox>
        <span>hihi</span>
      </IssueTitleBottomStyle>
    </div>
  );
};

export default IssueTitle;
