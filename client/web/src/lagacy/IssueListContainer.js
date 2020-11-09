import React, { useState, useEffect } from 'react';
import Issue from '../Issue.js';
import styled from 'styled-components';

const IssueStyle = styled.ul`
  background-color: green;
`;

const IssueListContainer = () => {
  const [issue, setIssue] = useState([]);

  const fetchInitialData = async (url) => {
    const data = await fetch(url);
    const issueJson = await data.json();
    setIssue(issueJson);
  };

  useEffect(() => {
    fetchInitialData('http://localhost:8080/api/issue?isOpen=true');
  }, []);

  return (
    <IssueStyle className="IssueListContainer">
      <Issue issues={issue} />
    </IssueStyle>
  );
};

export default IssueListContainer;
