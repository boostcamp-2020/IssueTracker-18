import React from 'react';

const IssueMetaInfo = ({ issueId, isOpen, updatedAt = '1 days ago' }) => {
  return (
    <div>
      {issueId} {isOpen === true ? 'opened' : 'closed'} {updatedAt}
    </div>
  );
};

export default IssueMetaInfo;
