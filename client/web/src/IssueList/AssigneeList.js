import React, { useState, useEffect } from 'react';
import Assignee from './Assignee.js';
import styled from 'styled-components';

const AssignessListStyle = styled.div`
  position: absolute;
  right: 45px;
  display: ${props => props.buttonClicked};
  background-color: pink;
`;

const AssigneeList = ({ buttonClicked }) => {
  const [assigneeList, setAssigneeList] = useState([]);
  // const [authorList, setAuthorList] = useState([]);

  const fetchUserInitialData = async url => {
    const data = await fetch(url);
    const user = await data.json();
    setAssigneeList(user);
  };

  useEffect(() => {
    fetchUserInitialData('http://localhost:8080/api/user');
  }, []);

  const assigneeItems = assigneeList.map((v, i) => {
    return <Assignee key={i} assignee={v} />;
  });
  return (
    <AssignessListStyle buttonClicked={buttonClicked ? 'block' : 'none'} className="AssigneeList">
      {assigneeItems}
    </AssignessListStyle>
  );
};

export default AssigneeList;
