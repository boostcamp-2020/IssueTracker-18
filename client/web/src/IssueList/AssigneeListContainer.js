import React, { useState, useEffect } from 'react';
import AssigneeList from './AssigneeList.js';
import styled from 'styled-components';

const AssigneeListStyle = styled.div`
  background-color: ${props => props.color};
`;

const AssigneeListContainer = props => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const displayAssigneeListEventHandler = e => {
    e.preventDefault();
    // const assigneeListEl = e.target.closest('div').lastElementChild;
    console.log(buttonClicked);
    if (buttonClicked == true) {
      setButtonClicked(false);
    } else {
      setButtonClicked(true);
    }
  };

  return (
    <AssigneeListStyle color={props.color} className="IssueList__list__filter__assignee-list">
      <button className="IssueList__list__filter__button" onClick={displayAssigneeListEventHandler}>
        assignee
      </button>
      <AssigneeList buttonClicked={buttonClicked} />
    </AssigneeListStyle>
  );
};

export default AssigneeListContainer;
