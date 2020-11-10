import React from 'react';
import styled from 'styled-components';

const StyledLabelListHeader = styled.div`
  display: flex;
  padding: 16px;
  border-bottom: 1px solid #e1e4e8;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  background-color: #f6f8fa;
  font-weight: 500;
`;

const LabelListHeader = props => {
  const countLabels = () => {
    return props.labels.length;
  };

  return (
    <StyledLabelListHeader>
      <div className="label-count-container">{countLabels()} labels</div>
    </StyledLabelListHeader>
  );
};

export default LabelListHeader;
