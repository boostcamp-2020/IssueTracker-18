import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLabelMilestoneNav = styled.div`
  display: flex;
  border: 1px solid #e1e4e8;
  border-radius: 6px;

  div,
  .label-link {
    display: flex;
    padding: 5px 16px 5px 16px;
    align-items: center;
  }

  .label-link {
    border-right: 1px solid #e1e4e8;
  }

  svg {
    margin-right: 4px;
  }
`;

const LabelMilestoneNav = props => {
  return (
    <StyledLabelMilestoneNav>
      <Link to="/label" className="label-link">
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M2.5 7.775V2.75a.25.25 0 01.25-.25h5.025a.25.25 0 01.177.073l6.25 6.25a.25.25 0 010 .354l-5.025 5.025a.25.25 0 01-.354 0l-6.25-6.25a.25.25 0 01-.073-.177zm-1.5 0V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 010 2.474l-5.026 5.026a1.75 1.75 0 01-2.474 0l-6.25-6.25A1.75 1.75 0 011 7.775zM6 5a1 1 0 100 2 1 1 0 000-2z"
          ></path>
        </svg>
        Labels
      </Link>

      <div>
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
          <path d="M7.75 0a.75.75 0 01.75.75V3h3.634c.414 0 .814.147 1.13.414l2.07 1.75a1.75 1.75 0 010 2.672l-2.07 1.75a1.75 1.75 0 01-1.13.414H8.5v5.25a.75.75 0 11-1.5 0V10H2.75A1.75 1.75 0 011 8.25v-3.5C1 3.784 1.784 3 2.75 3H7V.75A.75.75 0 017.75 0zm0 8.5h4.384a.25.25 0 00.161-.06l2.07-1.75a.25.25 0 000-.38l-2.07-1.75a.25.25 0 00-.161-.06H2.75a.25.25 0 00-.25.25v3.5c0 .138.112.25.25.25h5z"></path>
        </svg>
        Milestones
      </div>
    </StyledLabelMilestoneNav>
  );
};

export default LabelMilestoneNav;
