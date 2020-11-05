import React, { Component } from 'react';

const IssueMilestone = ({ milestone }) => {
  return (
    <div className="IssueMilestone">
      <span>{milestone.title}</span>
    </div>
  );
};

export default IssueMilestone;
