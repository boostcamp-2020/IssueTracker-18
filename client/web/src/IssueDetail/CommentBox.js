import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import ButtonComponent from './ButtonComponent';
import changeTime from '../../utils/changeTime';
import { CommentContext } from './store/store';

const CommentBoxStyle = styled.div`
  width: 600px;
  border: 1px solid #d1d5da;
  border-radius: 10px;
  margin-bottom: 5px;
`;

const CommentTitleStyle = styled.div`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: ${props => props.color};
  padding: 17px 10px;
`;

const CommentTitleEditStyle = styled.span`
  float: right;
`;

const CommentContentStyle = styled.div`
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 17px 10px;
`;

const CreaterEmailStyle = styled.span`
  font-weight: 600;
  color: #24292e;
`;

const UpdatedTimeStyle = styled.span`
  font-size: 14px;
  color: #586069;
`;

const CommentUpdateTextArea = styled.textarea`
  display: block;
  width: 100%;
  min-height: 100px;
  max-height: 500px;
  padding: 8px;
`;

const CommentUpdateButtonStyle = styled.div`
  float: right;
`;

const CommentBox = ({ id, isFirst, content, creater, updatedAt }) => {
  const [commentEdit, setCommentEdit] = useState(false);
  const { comments, commentDispatch } = useContext(CommentContext);

  const changeCommentEdit = e => {
    setCommentEdit(!commentEdit);
  };

  const updateComment = async e => {
    const updatedCommentContent = document.getElementById('commentUpdateTextArea').value;
    const data = await fetch(`http://localhost:8080/api/comment`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        id,
        content: updatedCommentContent,
      }),
    });

    const updatedComment = await data.json();
    if (updatedComment) {
      commentDispatch({ type: 'updateComment', payload: updatedComment });
    }

    document.getElementById('commentUpdateTextArea').value = '';
    setCommentEdit(!commentEdit);
  };

  const CommentBoxByState = status => {
    let tem;

    if (status) {
      if (!commentEdit) {
        tem = (
          <CommentBoxStyle>
            <CommentTitleStyle color="#f6f8fa">
              <CreaterEmailStyle>{creater.email}&nbsp;</CreaterEmailStyle>
              <CommentTitleEditStyle onClick={changeCommentEdit}>Edit</CommentTitleEditStyle>
              <UpdatedTimeStyle>
                commented {changeTime(new Date(), new Date(updatedAt))}&nbsp;
              </UpdatedTimeStyle>
            </CommentTitleStyle>
            <CommentContentStyle>{content}</CommentContentStyle>
          </CommentBoxStyle>
        );
      }
      if (commentEdit) {
        tem = (
          <CommentBoxStyle>
            <CommentUpdateTextArea id="commentUpdateTextArea" />
            <CommentUpdateButtonStyle>
              <ButtonComponent
                color="black"
                backgroundColor="#fafbfc"
                name="Cancel"
                fontSize="18px"
                handler={changeCommentEdit}
              />
              <ButtonComponent
                color="white"
                backgroundColor="#28a745"
                name="Comment"
                fontSize="18px"
                handler={updateComment}
              />
            </CommentUpdateButtonStyle>
          </CommentBoxStyle>
        );
      }
    }
    if (!status) {
      tem = (
        <CommentBoxStyle>
          <CommentTitleStyle color="#f6f8fa">
            <CreaterEmailStyle>{creater.email}&nbsp;</CreaterEmailStyle>
            <UpdatedTimeStyle>
              commented {changeTime(new Date(), new Date(updatedAt))}&nbsp;
            </UpdatedTimeStyle>
          </CommentTitleStyle>
          <CommentContentStyle>{content}</CommentContentStyle>
        </CommentBoxStyle>
      );
    }

    return tem;
  };
  return CommentBoxByState(isFirst);
};

export default CommentBox;
