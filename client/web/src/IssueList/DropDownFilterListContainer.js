import React, { useState, useEffect } from 'react';
import DropDownFilterList from './DropDownFilterList.js';
import styled from 'styled-components';

const DropDownListStyle = styled.div`
  background-color: ${props => props.color};
`;

const DropDownFilterListContainer = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const displayDropDownListEventHandler = e => {
    e.preventDefault();
    if (buttonClicked == true) {
      setButtonClicked(false);
    } else {
      setButtonClicked(true);
    }
  };

  return (
    <DropDownListStyle className="IssueList__list__filter__dropdown-list">
      <button className="IssueList__list__filter__button" onClick={displayDropDownListEventHandler}>
        filter
      </button>
      <DropDownFilterList buttonClicked={buttonClicked} />
    </DropDownListStyle>
  );
};

export default DropDownFilterListContainer;
