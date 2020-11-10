import React from 'react';
import styled from 'styled-components';

const StyledLabelAddForm = styled.form`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;

  div {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
  }

  label {
    margin-bottom: 6px;
  }

  .label-form-button-container {
    flex-direction: row;
    justify-content: space-between;
    margin-right: 0px;
  }

  button {
    display: flex;
    align-items: center;
    background-color: #2ea44f;
    color: white;
    font-size: 1em;
    border: none;
    border-radius: 6px;
    padding: 5px 16px 5px 16px;
    cursor: pointer;
    outline: none;
    margin-left: 10px;
  }
`;

const LabelAddForm = props => {
  return (
    <StyledLabelAddForm>
      <div className="label-form-title">
        <label for="title">Label name</label>
        <input type="text" name="title" id="title" />
      </div>
      <div className="label-form-description">
        <label>Description</label>
        <input></input>
      </div>
      <div className="label-form-color">
        <label>Color</label>
        <input></input>
      </div>
      <div className="label-form-button-container">
        <button>Cancel</button>
        <button>Create label</button>
      </div>
    </StyledLabelAddForm>
  );
};

export default LabelAddForm;
