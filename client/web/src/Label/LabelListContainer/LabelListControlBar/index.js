import React, { useState } from 'react';
import styled from 'styled-components';
import LabelMilestoneNav from './LabelMilestoneNav';
import LabelAddButton from './LabelAddButton';
import LabelAddFormContainer from './LabelAddFormContainer';

const StyledLabelListControlBar = styled.div`
  .label-controlbar {
    display: flex;
    justify-content: space-between;
    height: 40px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

const LabelListControlBar = props => {
  const [formToggleOn, setFormToggleOn] = useState(false);

  const formToggleHandler = () => {
    setFormToggleOn(!formToggleOn);
  };

  return (
    <StyledLabelListControlBar>
      <div className="label-controlbar">
        <LabelMilestoneNav />
        <LabelAddButton onClick={formToggleHandler} />
      </div>
      <LabelAddFormContainer formToggleOn={formToggleOn} />
    </StyledLabelListControlBar>
  );
};

export default LabelListControlBar;
