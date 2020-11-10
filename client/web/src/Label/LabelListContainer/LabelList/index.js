import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LabelListHeader from './LabelListHeader';
import Label from './Label';

const StyledLabelList = styled.div`
  border: 1px solid #e1e4e8;
  border-bottom: none;
  border-radius: 6px;
`;

const LabelList = props => {
  const [labels, setLabels] = useState([]);

  const fetchInitialData = async url => {
    const rawLabels = await fetch(url);
    const labels = await rawLabels.json();
    setLabels(labels);
  };

  useEffect(() => {
    const url = API_HOST + '/label';
    fetchInitialData(url);
  }, []);

  const labelElements = labels.map(label => <Label label={label} />);

  return (
    <StyledLabelList>
      <LabelListHeader labels={labels} />
      {labelElements}
    </StyledLabelList>
  );
};

export default LabelList;
