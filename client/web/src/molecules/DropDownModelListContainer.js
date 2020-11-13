import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DropDownModelList from '../atoms/DropDownModelList';

const StyledDropDownList = styled.div`
  background-color: ${props => props.color};
`;

const StyledDropDownButton = styled.div`
  background-color: ${props => props.color};
  margin: 0 16px;
  font-size: 14px;
  line-height: 21px;
  cursor: pointer;
`;

const DropDownListContainer = ({ model }) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const displayDropDownListEventHandler = e => {
    e.preventDefault();
    if (buttonClicked === true) {
      setButtonClicked(false);
    } else {
      setButtonClicked(true);
    }
  };

  return (
    <StyledDropDownList className="IssueList__list__filter__dropdown-list">
      <StyledDropDownButton onClick={displayDropDownListEventHandler}>{model}</StyledDropDownButton>
      <DropDownModelList model={model} buttonClicked={buttonClicked} />
    </StyledDropDownList>
  );
};

export default DropDownListContainer;
