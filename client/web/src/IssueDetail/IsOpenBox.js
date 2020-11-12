import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const OpenBox = styled.h4`
  display: inline-block;
  width: 60px;
  height: 30px;
  padding: 5px 5px;
  color: ${props => props.color};
  background-color: ${props => props.backgroundColor};
  border-radius: 30px;
  text-align: center;
`;

const IsOpenBox = ({ isOpen }) => {
  return isOpen === true ? (
    <OpenBox color="#fff" backgroundColor="#28a745">
      <span>Open</span>
    </OpenBox>
  ) : (
    <OpenBox color="#fff" backgroundColor="#d73a49">
      Closed
    </OpenBox>
  );
};

export default IsOpenBox;
