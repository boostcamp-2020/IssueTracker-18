import React from 'react';
import styled from 'styled-components';
import getFontColorForBackground from '../utils/adjust-fontcolor-backgroundcolor';

const StyledLabelTag = styled.div`
  background-color: ${props => props.color};
  color: ${props => getFontColorForBackground(props.color)};
  border: 1px solid transparent;
  border-radius: 2em;
  padding: 5px 10px 5px 10px;
  font-weight: 500;
`;

const LabelTag = ({ title, color }) => {
  return <StyledLabelTag color={color}>{title}</StyledLabelTag>;
};

export default LabelTag;
