import React, { useContext } from 'react';
import styled from 'styled-components';
import ButtonComponent from './ButtonComponent';
import { IssueContext, CommentContext } from './store/store';

const CommentCreateButtonStyle = styled.div`
  float: right;
`;

const CommentCreateButton = () => {
  const { issue, issueDispatch } = useContext(IssueContext);
  const { commentDispatch } = useContext(CommentContext);

  const changeIsOpen = async e => {
    const result = await fetch(`${PRODUCT_HOST}/issue/${issue.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        title: issue.title,
        isOpen: !issue.isOpen,
      }),
    });

    const { numOfaffectedRows } = await result.json();
    if (numOfaffectedRows > 0) {
      issueDispatch({ type: 'updateIsOpen', payload: !issue.isOpen });
    }
  };

  const createComment = async e => {
    const newCommentContent = document.getElementById('commentCreateTextArea').value;
    const data = await fetch(`${PRODUCT_HOST}/comment`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        isFirst: false,
        content: newCommentContent,
        createrId: 1,
        issueId: issue.id,
      }),
    });

    const newComment = await data.json();
    if (newComment) {
      commentDispatch({ type: 'addComment', payload: newComment });
    }

    document.getElementById('commentCreateTextArea').value = '';
  };

  return (
    <CommentCreateButtonStyle>
      {issue.isOpen === true ? (
        <ButtonComponent
          color="black"
          backgroundColor="#fafbfc"
          name="Close issue"
          fontSize="18px"
          handler={changeIsOpen}
        ></ButtonComponent>
      ) : (
        <ButtonComponent
          color="black"
          backgroundColor="#fafbfc"
          name="Reopen issue"
          fontSize="18px"
          handler={changeIsOpen}
        ></ButtonComponent>
      )}
      <ButtonComponent
        color="white"
        backgroundColor="#28a745"
        name="Comment"
        fontSize="18px"
        handler={createComment}
      ></ButtonComponent>
    </CommentCreateButtonStyle>
  );
};

export default CommentCreateButton;
