import React, { useState, useEffect } from 'react';
import DropDownItem from '../atoms/DropDownItem.js';
import styled from 'styled-components';

const DropDownListStyle = styled.div`
  position: absolute;
  // right: 45px;
  display: ${props => props.buttonClicked};
  background-color: pink;
`;

const DropDownModelList = ({ model, buttonClicked }) => {
  let dbTableName = model;
  if (model === 'assignee') {
    dbTableName = 'user';
  }
  if (model === 'author') {
    dbTableName = 'user';
  }

  const [list, setList] = useState([]);
  // const [authorList, setAuthorList] = useState([]);

  const fetchInitialData = async url => {
    const data = await fetch(url);
    const jsonData = await data.json(); // 여기 동기식으로 동작되는거 아닌가?
    setList(jsonData);
  };

  useEffect(() => {
    let url = 'http://localhost:8080/api/';
    url += dbTableName;
    fetchInitialData(url);
  }, []);

  const listItems = list.map((v, i) => {
    let title = v.title;
    if (model === 'user') {
      title = v.name;
    }
    return <DropDownItem key={i} title={title} />;
  });
  return (
    <DropDownListStyle buttonClicked={buttonClicked ? 'block' : 'none'}>
      {listItems}
    </DropDownListStyle>
  );
};

export default DropDownModelList;
