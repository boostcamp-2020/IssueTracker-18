import React from 'react';

const Assignee = ({ assignee }) => {
  return (
    <div className="Assignee">
      <span>{assignee.email}</span>
    </div>
  );
};

export default Assignee;
