import React, { useState, useEffect } from 'react';
import DropDownItem from '../atoms/DropDownItem.js';
import styled from 'styled-components';

const DropDownListStyle = styled.div`
  position: absolute;
  // right: 45px;
  display: ${props => props.buttonClicked};
  background-color: pink;
`;

const DropDownModelList = ({ buttonClicked }) => {
  const [list, setList] = useState([
    { title: 'Open issues', state: 'open' },
    { title: 'Your issues', state: 'myIssue' },
    { title: 'Everything assigned to you', state: 'assign' },
    { title: 'Everything mentioning you', state: 'memtion' },
    { title: 'Closed issues', state: 'close' },
  ]);
  // const [authorList, setAuthorList] = useState([]);

  // const fetchInitialData = async url => {
  //   const data = await fetch(url);
  //   const jsonData = await data.json(); // 여기 동기식으로 동작되는거 아닌가?
  //   setList(jsonData);
  // };

  // useEffect(() => {
  // const jsonData = {};
  // setList(jsonData);
  // }, []);

  const listItems = list.map((v, i) => {
    return <DropDownItem key={i} title={v.title} />;
  });
  return (
    <DropDownListStyle buttonClicked={buttonClicked ? 'block' : 'none'}>
      {listItems}
    </DropDownListStyle>
  );
};

export default DropDownModelList;
