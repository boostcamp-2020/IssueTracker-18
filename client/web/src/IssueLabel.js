import React, { Component } from 'react';
// import styled from 'styled-components';

// const Div = styled.div`
//   padding: 10px 20px;
//   border: none;
//   border-radius: 4px;
//   background-color: #1890ff;
//   color: #fff;
//   font-size: 14px;
//   cursor: pointer;
//   &:hover {
//     background: #40a9ff;
//   }
// `;

const IssueLabel = ({ label }) => {
  return (
    <div className="IssueLabel">
      <span>{label.title}</span>
    </div>
  );
};

export default IssueLabel;
