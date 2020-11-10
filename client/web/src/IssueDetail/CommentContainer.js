import React, { useState, useEffect } from 'react';
import CommentBox from './CommentBox';

const CommentContainer = () => {
  return (
    <div className="CommentContainer">
      <CommentBox isFirst={true}></CommentBox>
      <CommentBox isFrist={false}></CommentBox>
    </div>
  );
};

export default CommentContainer;
