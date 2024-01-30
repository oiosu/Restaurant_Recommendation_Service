import React from "react";
import MapMain from "./Mapmap";
import styled from "styled-components";

function MapMainComponent() {
  return (
    <StyledMapMainContainer>
      <div className="map_main"></div>
      <MapMain></MapMain>
    </StyledMapMainContainer>
  );
}

export default MapMainComponent;

const StyledMapMainContainer = styled.div`
  .map_main {
    margin-top: 150px;
  }
`;
