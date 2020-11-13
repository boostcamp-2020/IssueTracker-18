import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import LabelMilestoneControlBar from './LabelMilestoneControlBar';
import LabelList from './Label/LabelList';

const LabelMilestoneContext = React.createContext();

const Main = styled.main`
  margin: 32px 15%;
  display: flex;
  flex-direction: column;
`;

const labelsReducer = (labels, { type, payload }) => {
  switch (type) {
    case 'RELOAD':
      return payload;
    default:
      throw new Error();
  }
};

const LabelMilestoneRootContainer = props => {
  const [labels, labelsDispatch] = useReducer(labelsReducer, []);

  const handleReload = async () => {
    const rawLabels = await fetch(`${PRODUCT_HOST}/label`);
    const jsonLabels = await rawLabels.json();
    labelsDispatch({
      type: 'RELOAD',
      payload: jsonLabels,
    });
  };

  useEffect(() => {
    handleReload();
  }, []);

  return (
    <LabelMilestoneContext.Provider value={{ labels, handleReload }}>
      <Main>
        <LabelMilestoneControlBar />
        <LabelList />
      </Main>
    </LabelMilestoneContext.Provider>
  );
};

export { LabelMilestoneContext, LabelMilestoneRootContainer };
