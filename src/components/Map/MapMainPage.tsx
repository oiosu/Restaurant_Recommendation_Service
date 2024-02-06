import React from "react";
import styled from "styled-components";
import { FaMapMarkedAlt } from "react-icons/fa";

function MapMainComponent() {
  return (
    <StyledMapMainContainer>
      <div className="map_main">
        <div className="map_content">
          <StyledMapTitle>
            <FaMapMarkedAlt />
            또간지도 지도
          </StyledMapTitle>
        </div>
      </div>
    </StyledMapMainContainer>
  );
}

export default MapMainComponent;

const StyledMapMainContainer = styled.div`
  .map_main {
    margin-top: 150px;
  }
`;

const StyledMapTitle = styled.span`
  margin-left: 375px;
  font-size: 25px;
  font-weight: bold;

  svg {
    margin-right: 10px;
    width: 50px;
    height: 30px;
    color: #feaa00;
  }
`;
