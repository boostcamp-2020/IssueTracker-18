import React from 'react';
import styled from 'styled-components';
import LabelTag from '../../atoms/LabelTag';

const StyledLabel = styled.div`
  display: flex;
  padding: 16px;
  border-bottom: 1px solid #e1e4e8;
  justify-content: space-between;

  .label-title-container {
    display: flex;
    width: 40%;
  }

  .Label__description {
    display: flex;
    align-items: center;
  }
  .label-button-container {
    display: flex;
    justify-content: space-between;
    width: 8%;
  }
  .label-button-container button {
    border: none;
    background-color: transparent;
  }
`;

const Label = props => {
  const { title, color, description } = props.label;
  return (
    <StyledLabel color={color}>
      <div className="label-title-container">
        <LabelTag title={title} color={color} />
      </div>
      <div className="Label__description">{description}</div>
      <div className="label-button-container">
        <button className="label-button-edit">Edit</button>
        <button className="label-button-delete">Delete</button>
      </div>
    </StyledLabel>
  );
};

export default Label;
