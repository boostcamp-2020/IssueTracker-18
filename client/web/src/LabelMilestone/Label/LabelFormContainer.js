import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import LabelForm from './LabelForm';
import generateRandomColor from '../../utils/generate-random-color';
import LabelTag from '../../atoms/LabelTag';
import { LabelMilestoneContext } from '../LabelMilestoneRootContainer';

const StyledLabelAddFormContainer = styled.div`
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  padding: 20px 16px 20px 20px;
  background-color: #f6f8fa;
  margin-bottom: 14px;
  display: ${props => (props.formToggleOn ? 'block' : 'none')};

  .label-preview-container {
    display: inline-block;
  }
`;

const LabelAddFormContainer = ({ formToggleOn, onToggle }) => {
  const [labelName, setLabelName] = useState('Label-preview');
  const [labelColor, setLabelColor] = useState('#c5def5');
  const [labelDescription, setLabelDescription] = useState('');

  const handleInputChange = event => {
    switch (event.target.name) {
      case 'title':
        setLabelName(event.target.value);
        break;
      case 'color':
        break;
      case 'description':
        setLabelDescription(event.target.value);
        break;
      default:
        throw new Error();
    }
  };

  const handleColorButtonClick = () => {
    const newColor = generateRandomColor();
    setLabelColor(newColor);
  };

  const { handleReload } = useContext(LabelMilestoneContext);

  const handleLabelFormSubmit = async event => {
    event.preventDefault();
    await fetch(`${API_HOST}/label`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: labelName,
        description: labelDescription,
        color: labelColor,
      }),
    });

    handleReload();
  };

  return (
    <StyledLabelAddFormContainer formToggleOn={formToggleOn}>
      <div className="label-preview-container">
        <LabelTag title={labelName} color={labelColor} />
      </div>

      <LabelForm
        value={{ labelName, labelColor, labelDescription }}
        onChange={handleInputChange}
        onColorChange={handleColorButtonClick}
        onToggle={onToggle}
        onSubmit={handleLabelFormSubmit}
      />
    </StyledLabelAddFormContainer>
  );
};

export default LabelAddFormContainer;
