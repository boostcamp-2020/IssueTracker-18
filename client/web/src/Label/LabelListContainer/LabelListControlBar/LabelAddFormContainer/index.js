import React from 'react';
import styled from 'styled-components';
import LabelAddForm from './LabelAddForm';

const StyledLabelAddFormContainer = styled.div`
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  padding: 20px 16px 20px 20px;
  background-color: #f6f8fa;
  margin-bottom: 14px;
  display: ${props => (props.formToggleOn ? 'block' : 'none')};
`;

const LabelAddFormContainer = ({ formToggleOn }) => {
  return (
    <StyledLabelAddFormContainer formToggleOn={formToggleOn}>
      <div>label preview</div>
      <LabelAddForm />
    </StyledLabelAddFormContainer>
  );
};

export default LabelAddFormContainer;
