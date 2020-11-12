import React from 'react';
import styled from 'styled-components';

const StyledListItem = styled.div`
  border: 1px solid var(--color-border-primary);
  &:hover {
    background-color: var(--hover-item-color);
  }
  width: 200px;
  cursor: pointer;
`;

const ListItem = ({ id = 0, listItemContent }) => {
  return <StyledListItem id={id}>{listItemContent}</StyledListItem>;
};

export default ListItem;
