import React from 'react';
import styled from 'styled-components';

const StyledLabelAddButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #2ea44f;
  color: white;
  font-size: 1em;
  border: none;
  border-radius: 6px;
  padding: 5px 16px 5px 16px;
  cursor: pointer;
  outline: none;
`;

const LabelAddButton = props => (
  <StyledLabelAddButton onClick={props.onClick}>New Label</StyledLabelAddButton>
);

export default LabelAddButton;
