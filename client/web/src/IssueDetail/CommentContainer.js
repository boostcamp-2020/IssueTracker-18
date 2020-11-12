import React, { useContext } from 'react';
import styled from 'styled-components';
import CommentBox from './CommentBox';
import { CommentContext, CreaterContext } from './store/store';

const CommentContainerStyle = styled.div`
  margin: 10px 0px;
`;

const CommentIndentStyle = styled.div`
  margin-top: 40px;
`;
const CommentContainer = ({ firstComment, setFirstComment }) => {
  const { comments } = useContext(CommentContext);
  const { creater } = useContext(CreaterContext);

  return (
    <CommentContainerStyle>
      {
        <CommentBox
          key={firstComment.id}
          id={firstComment.id}
          isFirst={firstComment.isFirst}
          content={firstComment.content}
          creater={creater}
          createdAt={firstComment.createdAt}
          setFirstComment={setFirstComment}
        ></CommentBox>
      }
      <CommentIndentStyle>
        {comments.map(comment => (
          <CommentBox
            key={comment.id}
            id={comment.id}
            isFirst={comment.isFirst}
            content={comment.content}
            creater={comment.creater}
            createdAt={comment.createdAt}
          ></CommentBox>
        ))}
      </CommentIndentStyle>
    </CommentContainerStyle>
  );
};

export default CommentContainer;
