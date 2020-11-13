import React, { useState } from 'react';
import styled from 'styled-components';
import DropDownFilterList from '../atoms/DropDownFilterList';

const StyledDropDownListContainer = styled.div`
  background-color: ${props => props.color};
`;

const StyledFilterButton = styled.div`
  background-color: ${props => props.color};
  padding: 5px 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid;
  border-radius: 6px;
  color: #24292e;
  background-color: #fafbfc;
  border-color: rgba(27, 31, 35, 0.15);
  box-shadow: 0, 1px, 0, rgba(27, 31, 35, 0.04), insect 0 1px 0 hsla(0, 0%, 100%, 0.25);
  transition: 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  transition-property: color, background-color, border-color;
`;

const DropDownFilterListContainer = () => {
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
    <StyledDropDownListContainer>
      <StyledFilterButton onClick={displayDropDownListEventHandler}>Filters</StyledFilterButton>
      <DropDownFilterList buttonClicked={buttonClicked} />
    </StyledDropDownListContainer>
  );
};

export default DropDownFilterListContainer;
