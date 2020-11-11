import React, { useState } from 'react';
import styled from 'styled-components';
import LabelMilestoneNav from './LabelMilestoneNav';
import LabelFormContainer from './Label/LabelFormContainer';
import Button from '../atoms/Button';

const Div = styled.div`
  .label-controlbar {
    display: flex;
    justify-content: space-between;
    height: 40px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

const LabelMilestoneControlBar = props => {
  const [formToggleOn, setFormToggleOn] = useState(false);

  const formToggleHandler = event => {
    event.preventDefault();
    setFormToggleOn(!formToggleOn);
  };

  return (
    <Div>
      <div className="label-controlbar">
        <LabelMilestoneNav />
        <Button onClick={formToggleHandler} buttonTitle="New label" />
      </div>
      <LabelFormContainer formToggleOn={formToggleOn} onToggle={formToggleHandler} />
    </Div>
  );
};

export default LabelMilestoneControlBar;
