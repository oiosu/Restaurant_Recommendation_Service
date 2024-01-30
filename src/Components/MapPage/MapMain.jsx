import React from "react";
import MapMain from "./Mapmap";
import styled from "styled-components";

function MapMainComponent() {
  return (
    <StyledMapMainContainer>
      <div className="map_main">
        <div className="map_content">
          <span className="map_title">또간지도 지도</span>
        </div>
      </div>
      <MapMain></MapMain>
    </StyledMapMainContainer>
  );
}

export default MapMainComponent;

const StyledMapMainContainer = styled.div`
  .map_main {
    margin-top: 150px;
  }
  .map_title {
    margin-left: 375px;
    font-size: 25px;
    font-weight: bold;
  }
`;
