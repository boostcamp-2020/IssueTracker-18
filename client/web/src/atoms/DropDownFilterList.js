import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';
import clickEventHandler from '../controllers/DropDownFilterList';
import { FilterClickEventHandlerContext } from '../IssueList/IssueList';

const DropDownListStyle = styled.div`
  position: absolute;
  // right: 45px;
  display: ${props => props.buttonClicked};
  background-color: white;
`;

const DropDownModelList = ({ buttonClicked }) => {
  const filterClickEventHandler = useContext(FilterClickEventHandlerContext);

  const [list, setList] = useState([
    { content: 'Open issues', state: 'open' },
    { content: 'Your issues', state: 'myIssue' },
    { content: 'Everything assigned to you', state: 'assign' },
    { content: 'Everything mentioning you', state: 'memtion' },
    { content: 'Closed issues', state: 'close' },
  ]);

  const listItems = list.map((item, i) => {
    const { content } = item;
    return <ListItem key={i} listItemContent={content} />;
  });
  return (
    <DropDownListStyle
      buttonClicked={buttonClicked ? 'block' : 'none'}
      onClick={e => clickEventHandler(filterClickEventHandler, e)}
    >
      {listItems}
    </DropDownListStyle>
  );
};

export default DropDownModelList;
