import React from 'react';
import changeTime from '../utils/changeTime';

const IssueMetaInfo = ({ issueId, isOpen, updatedAt = '1 days ago' }) => {
  return (
    <div>
      {issueId} {isOpen === true ? 'opened' : 'closed'}{' '}
      {changeTime(new Date(), new Date(updatedAt))}
    </div>
  );
};

export default IssueMetaInfo;
