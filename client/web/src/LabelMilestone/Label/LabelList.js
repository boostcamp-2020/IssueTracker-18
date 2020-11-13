import React, { useContext } from 'react';
import styled from 'styled-components';
import LabelListHeader from './LabelListHeader';
import Label from './Label';
import { LabelMilestoneContext } from '../LabelMilestoneRootContainer';

const StyledLabelList = styled.div`
  border: 1px solid #e1e4e8;
  border-bottom: none;
  border-radius: 6px;
`;

const LabelList = props => {
  const { labels } = useContext(LabelMilestoneContext);

  const labelElements = labels.map(label => <Label key={label.id} label={label} />);

  return (
    <StyledLabelList>
      <LabelListHeader labels={labels} />
      {labelElements}
    </StyledLabelList>
  );
};

export default LabelList;
