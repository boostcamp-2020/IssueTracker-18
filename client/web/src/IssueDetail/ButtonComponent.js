import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
  color: ${props => props.color};
  background-color: ${props => props.backgroundColor};
  font-size: ${props => props.fontSize};
  padding: 3px 12px;
  border: 1px solid #d1d5da;
`;

const ButtonComponent = ({ name, color, backgroundColor, handler, fontSize }) => {
  return (
    <ButtonStyle
      color={color}
      backgroundColor={backgroundColor}
      fontSize={fontSize}
      onClick={handler}
    >
      {name}
    </ButtonStyle>
  );
};

export default ButtonComponent;
