import React from 'react';
import styled from 'styled-components';
import LabelListControlBar from './LabelListControlBar';
import LabelList from './LabelList';

const StyledLabelListContainer = styled.main`
  margin: 32px;
  display: flex;
  flex-direction: column;
`;

const LabelListContainer = props => {
  return (
    <StyledLabelListContainer>
      <LabelListControlBar />
      <LabelList />
    </StyledLabelListContainer>
  );
};

export default LabelListContainer;
