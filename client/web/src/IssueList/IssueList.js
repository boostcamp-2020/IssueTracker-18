import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import IssueListMain from '../organisms/IssueListMain';
import IssueListHeader from '../organisms/IssueListHeader';

const IssueListStyle = styled.main`
  margin: 32px;
`;

const IssueContext = React.createContext();
const FilterClickEventHandlerContext = React.createContext();
const FilterContext = React.createContext();

const IssueList = props => {
  const [issues, setIssue] = useState([]);

  const fetchIssue = async param => {
    const baseUrl = 'http://localhost:8080/api/issue';
    const url = baseUrl + param;
    const data = await fetch(url);
    const issueJson = await data.json();
    setIssue(issueJson);
  };

  useEffect(() => {
    fetchIssue('?isOpen=true');
  }, []);

  return (
    <IssueListStyle>
      <IssueContext.Provider value={issues}>
        <FilterClickEventHandlerContext.Provider value={fetchIssue}>
          <IssueListHeader />
          <IssueListMain />
        </FilterClickEventHandlerContext.Provider>
      </IssueContext.Provider>
    </IssueListStyle>
  );
};

export { IssueList as default, IssueContext, FilterClickEventHandlerContext };
