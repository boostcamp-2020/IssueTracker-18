import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';
import IssueContent from './IssueContent';
import IssueTitle from './IssueTitle';
import {
  CommentContext,
  commentReducer,
  IssueContext,
  issueReducer,
  CreaterContext,
  createrReducer,
} from './store/store';

const IssueDetailStyle = styled.div`
  padding: 20px;
`;

const IssueDetail = () => {
  const [comments, commentDispatch] = useReducer(commentReducer, []);
  const [issue, issueDispatch] = useReducer(issueReducer, {});
  const [creater, createrDispatch] = useReducer(createrReducer, {});

  const fetchInitialData = async url => {
    const fetchedData = await fetch(`${url}/comment/1`, {
      method: 'GET',
      mode: 'cors',
    });
    const dataToJson = await fetchedData.json();

    issueDispatch({ type: 'setIssue', payload: dataToJson.issue });
    createrDispatch({ type: 'setCreater', payload: dataToJson.issue.creater });
    commentDispatch({ type: 'setComments', payload: dataToJson.comments.comments });
  };

  useEffect(() => {
    fetchInitialData('http://localhost:8080/api');
  }, []);

  return (
    <IssueDetailStyle>
      <IssueContext.Provider value={{ issue, issueDispatch }}>
        <CreaterContext.Provider value={{ creater, createrDispatch }}>
          <IssueTitle />
        </CreaterContext.Provider>
        <CommentContext.Provider value={{ comments, commentDispatch }}>
          {<IssueContent />}
        </CommentContext.Provider>
      </IssueContext.Provider>
    </IssueDetailStyle>
  );
};

export default IssueDetail;
