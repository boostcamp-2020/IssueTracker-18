import React from 'react';
import styled from 'styled-components';
import getFontColorForBackground from '../utils/adjust-fontcolor-backgroundcolor';

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  background-color: ${({ style }) => {
    if (style) {
      const { backgroundColor } = style;
      return backgroundColor || '#2ea44f';
    }
    return '#2ea44f';
  }};
  color: ${({ style }) => {
    if (style) {
      const { backgroundColor } = style;
      return backgroundColor ? getFontColorForBackground(backgroundColor) : '#FFFFFF';
    }
    return '#FFFFFF';
  }};
  font-size: 1em;
  border: 1px solid #1b1f2326;
  border-radius: 6px;
  padding: 5px 16px 5px 16px;
  cursor: pointer;
  outline: none;
  margin-left: 10px;
`;

const Button = ({ buttonTitle, onClick, style }) => (
  <StyledButton onClick={onClick} style={style}>
    {buttonTitle}
  </StyledButton>
);

export default Button;
