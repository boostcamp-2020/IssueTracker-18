import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const OpenBox = styled.h4`
  display: inline-block;
  width: 50px;
  height: 30px;
  padding: 5px 5px;
  maring: 5px;
  color: ${props => props.color};
  background-color: ${props => props.backgroundColor};
`;
const IsOpenBox = ({ isOpen }) => {
  return isOpen === true ? (
    <OpenBox color="#fff" backgroundColor="#28a745">
      Open
    </OpenBox>
  ) : (
    <OpenBox color="#fff" backgroundColor="#d73a49">
      Open
    </OpenBox>
  );
};

export default IsOpenBox;
