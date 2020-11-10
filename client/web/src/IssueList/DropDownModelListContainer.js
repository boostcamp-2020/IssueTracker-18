import React, { useState, useEffect } from 'react';
import DropDownModelList from './DropDownModelList.js';
import styled from 'styled-components';

const DropDownListStyle = styled.div`
  background-color: ${props => props.color};
`;

const DropDownListContainer = ({ model }) => {
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
        {model}
      </button>
      <DropDownModelList model={model} buttonClicked={buttonClicked} />
    </DropDownListStyle>
  );
};

export default DropDownListContainer;
