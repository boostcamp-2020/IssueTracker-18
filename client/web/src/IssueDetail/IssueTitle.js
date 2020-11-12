import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import IsOpenBox from './IsOpenBox';
import ButtonComponent from './ButtonComponent';
import changeTime from '../../utils/changeTime';
import { CreaterContext, IssueContext } from './store/store';

const IssueTitleStyle = styled.div`
  border-bottom: 1px solid #e1e4e8;
`;

const IssueTitleTextStyle = styled.span`
  font-size: 32px;
`;

const ButtonPositionStyle = styled.div`
  float: right;
`;
const IssueIdStyle = styled.span`
  font-size: 32px;
  color: #6a737d;
`;

const IssueTitleTopStyle = styled.div`
  width: 100%;
  margin: 5px 0px;
`;

const IssueTitleBottomStyle = styled.div`
  width: 100%;
  margin: 5px 0px;
`;

const CreaterEmailStyle = styled.span`
  font-weight: 600;
  color: #586069;
`;

const UpdatedTimeStyle = styled.span`
  font-size: 14px;
  color: #586069;
`;

const IssueTitle = () => {
  const { creater } = useContext(CreaterContext);
  const { issue, issueDispatch } = useContext(IssueContext);
  const [isTitleEdit, setIsTitleEdit] = useState(false);

  const changeTitle = async e => {
    const newTitle = document.getElementById('titleName').value;
    if (newTitle !== '') {
      const result = await fetch(`${PRODUCT_HOST}/api/issue/${issue.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          title: newTitle,
          isOpen: true,
        }),
      });

      const { numOfaffectedRows } = await result.json();
      if (numOfaffectedRows > 0) {
        issueDispatch({ type: 'updateTitle', payload: newTitle });
      }
    }

    setIsTitleEdit(!isTitleEdit);
  };

  const changeIsTitleEdit = e => {
    setIsTitleEdit(!isTitleEdit);
  };

  return (
    <IssueTitleStyle>
      {isTitleEdit === false ? (
        <IssueTitleTopStyle>
          <IssueTitleTextStyle> {issue.title} </IssueTitleTextStyle>
          <IssueIdStyle> #{issue.id} </IssueIdStyle>
          <ButtonPositionStyle>
            <ButtonComponent
              color="black"
              handler={changeIsTitleEdit}
              backgroundColor="#fafbfc"
              name="Edit"
              fontSize="20px"
            ></ButtonComponent>
          </ButtonPositionStyle>
        </IssueTitleTopStyle>
      ) : (
        <div>
          <form id="titleEdit" style={{ display: 'inline-block' }}>
            <input
              id="titleName"
              type="text"
              placeholder={issue.title}
              style={{ display: 'inline-block', minHeight: '30px', fontSize: '16px' }}
            ></input>
          </form>
          <ButtonPositionStyle>
            <ButtonComponent
              color="black"
              handler={changeTitle}
              backgroundColor="#fafbfc"
              name="Save"
              fontSize="20px"
            ></ButtonComponent>
            <ButtonComponent
              color="black"
              handler={changeIsTitleEdit}
              backgroundColor="#fafbfc"
              name="Close"
              fontSize="20px"
            ></ButtonComponent>
          </ButtonPositionStyle>
        </div>
      )}
      <IssueTitleBottomStyle>
        <IsOpenBox isOpen={issue.isOpen}></IsOpenBox>
        <CreaterEmailStyle>&nbsp;{creater.email}&nbsp;</CreaterEmailStyle>
        <UpdatedTimeStyle>
          {issue.isOpen === true ? 'opened ' : 'closed '}
          this issue&nbsp;
          {changeTime(new Date(), new Date(issue.updatedAt))}
        </UpdatedTimeStyle>
      </IssueTitleBottomStyle>
    </IssueTitleStyle>
  );
};

export default IssueTitle;
