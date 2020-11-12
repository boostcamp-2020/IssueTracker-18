import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';
import clickEventHandler from '../controllers/DropDownModelList';
import { FilterClickEventHandlerContext } from '../IssueList/IssueList';

const DropDownListStyle = styled.div`
  position: absolute;
  // right: 45px;
  display: ${props => props.buttonClicked};
  background-color: white;
`;

const DropDownModelList = ({ model, buttonClicked }) => {
  const filterClickEventHandler = useContext(FilterClickEventHandlerContext);

  let dbTableName = model;
  if (model === 'assignee') {
    dbTableName = 'user';
  }
  if (model === 'author') {
    dbTableName = 'user';
  }

  const [list, setList] = useState([]);

  const fetchInitialModelData = async url => {
    const data = await fetch(url);
    const jsonData = await data.json(); // 여기 동기식으로 동작되는거 아닌가?
    setList(jsonData);
  };

  useEffect(() => {
    let url = 'http://localhost:8080/api/';
    url += dbTableName;
    fetchInitialModelData(url);
  }, []);

  const listItems = list.map((item, i) => {
    const { title = '', name = '' } = item;
    let listItemContent = title;
    if (title === '') {
      // title이 없는 table에서는 name을 content로 활용
      listItemContent = name;
    }
    return <ListItem key={i} id={item.id} listItemContent={listItemContent} />;
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
