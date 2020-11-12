import React from 'react';
import styled from 'styled-components';

const StyledTextArea = styled.form`
  width: 100%
  margin-left: -1px;
  font-size: 14px;
  line-height: 1.5;

`;

const StyledTextAreaInput = styled.input`
  padding: 5px 12px;
  width: 100%;
  margin-left: -1px;
  font-size: 14px;
  line-height: 20px;
  background-repeat: no-repeat;
  background-position: right 8px center;
  color: #24292e;
  border: 1px solid;
  border-radius: 6px;
  background-color: #fafbfc;
  border-color: rgba(27, 31, 35, 0.15);
  outline: none;
`;

const TextArea = (value, handleChange) => (
  <StyledTextArea>
    <label>
      <StyledTextAreaInput type="text" value="is:issue is:open" readOnly />
    </label>
  </StyledTextArea>
);

export default TextArea;
