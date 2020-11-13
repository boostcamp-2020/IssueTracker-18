import React, { useReducer, useEffect, useState } from 'react';
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
  margin: 32px 15%;
`;

const IssueDetail = ({ match }) => {
  const { id } = match.params;
  const [comments, commentDispatch] = useReducer(commentReducer, []);
  const [issue, issueDispatch] = useReducer(issueReducer, {});
  const [creater, createrDispatch] = useReducer(createrReducer, {});
  const [firstComment, setFirstComment] = useState({});

  const fetchInitialData = async () => {
    const fetchedData = await fetch(`${PRODUCT_HOST}/comment/${id}`, {
      method: 'GET',
      mode: 'cors',
    });
    const dataToJson = await fetchedData.json();

    issueDispatch({ type: 'setIssue', payload: dataToJson.issue });
    createrDispatch({ type: 'setCreater', payload: dataToJson.issue.creater });
    commentDispatch({ type: 'setComments', payload: dataToJson.comments.comments });
    setFirstComment({ ...firstComment, ...dataToJson.comments.firstComment[0] });
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <IssueDetailStyle>
      <IssueContext.Provider value={{ issue, issueDispatch }}>
        <CreaterContext.Provider value={{ creater, createrDispatch }}>
          <IssueTitle />
          <CommentContext.Provider value={{ comments, commentDispatch }}>
            {<IssueContent firstComment={firstComment} setFirstComment={setFirstComment} />}
          </CommentContext.Provider>
        </CreaterContext.Provider>
      </IssueContext.Provider>
    </IssueDetailStyle>
  );
};

export default IssueDetail;
