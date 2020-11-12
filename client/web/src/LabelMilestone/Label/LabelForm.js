import React, { useContext } from 'react';
import styled from 'styled-components';
import Button from '../../atoms/Button';
import { LabelMilestoneContext } from '../LabelMilestoneRootContainer';

const StyledLabelForm = styled.form`
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

  .color-change {
    display: flex;
    flex-direction: row;
  }
`;

const LabelForm = ({ value, onChange, onColorChange, onToggle, onSubmit }) => {
  return (
    <StyledLabelForm>
      <div className="label-form-title">
        <label htmlFor="title">Label name</label>
        <input type="text" name="title" value={value.labelName} onChange={onChange} />
      </div>
      <div className="label-form-description">
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={value.labelDescription}
          onChange={onChange}
        ></input>
      </div>
      <div className="label-form-color">
        <label>Color</label>
        <div className="color-change">
          <button type="button" onClick={onColorChange}>
            <svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M8 2.5a5.487 5.487 0 00-4.131 1.869l1.204 1.204A.25.25 0 014.896 6H1.25A.25.25 0 011 5.75V2.104a.25.25 0 01.427-.177l1.38 1.38A7.001 7.001 0 0114.95 7.16a.75.75 0 11-1.49.178A5.501 5.501 0 008 2.5zM1.705 8.005a.75.75 0 01.834.656 5.501 5.501 0 009.592 2.97l-1.204-1.204a.25.25 0 01.177-.427h3.646a.25.25 0 01.25.25v3.646a.25.25 0 01-.427.177l-1.38-1.38A7.001 7.001 0 011.05 8.84a.75.75 0 01.656-.834z"
              ></path>
            </svg>
          </button>
          <input type="text" name="color" id="color" value={value.labelColor} onChange={onChange} />
        </div>
      </div>
      <div className="label-form-button-container">
        <Button buttonTitle="Cancel" onClick={onToggle} style={{ backgroundColor: '#fafbfc' }} />
        <Button buttonTitle="Create label" onClick={onSubmit} />
      </div>
    </StyledLabelForm>
  );
};

export default LabelForm;
