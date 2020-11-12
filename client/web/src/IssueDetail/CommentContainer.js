import React, { useContext } from 'react';
import styled from 'styled-components';
import CommentBox from './CommentBox';
import { CommentContext } from './store/store';

const CommentContainerStyle = styled.div`
  margin: 10px 0px;
`;

const CommentIndentStyle = styled.div`
  margin-top: 40px;
`;
const CommentContainer = () => {
  const { comments } = useContext(CommentContext);

  return (
    <CommentContainerStyle>
      {
        <CommentBox
          key={'1'}
          isFirst={true}
          content={'first comment'}
          creater={{ email: 'sukstar76' }}
          updatedAt={'2020-11-03T07:12:41.000Z'}
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
            updatedAt={comment.updatedAt}
          ></CommentBox>
        ))}
      </CommentIndentStyle>
    </CommentContainerStyle>
  );
};

export default CommentContainer;
