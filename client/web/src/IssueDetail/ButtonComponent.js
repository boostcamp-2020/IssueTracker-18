import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
  color: ${props => props.color};
  background-color: ${props => props.backgroundColor};
  font-size: 12px;
  padding: 3px 12px;
  border: 1px solid #d1d5da;
`;

const ButtonComponent = ({ name, color, backgroundColor }) => {
  return (
    <ButtonStyle color={color} backgroundColor={backgroundColor}>
      {name}
    </ButtonStyle>
  );
};

export default ButtonComponent;
