import React, { useState, useEffect, useContext } from 'react';
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
  // const [labels, setLabels] = useState([]);

  // const fetchInitialData = async url => {
  //   const rawLabels = await fetch(url);
  //   const jsonLabels = await rawLabels.json();
  //   setLabels(jsonLabels);
  // };

  // useEffect(() => {
  //   const url = `${API_HOST}/label`;
  //   fetchInitialData(url);
  // }, []);

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
