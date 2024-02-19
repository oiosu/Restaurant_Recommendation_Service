import React from "react";
import styled from "styled-components";

export default class MapGuide extends React.Component {
  render() {
    return (
      <MapGuideContainer>
        <button>지도검색방법</button>
        <button>맛집제보방법</button>
      </MapGuideContainer>
    );
  }
}

const MapGuideContainer = styled.div`
  /* 여기에 스타일을 추가하세요 */
  button {
    padding: 10px;
    background-color: #fff;
    color: #feaa00;
    font-weight: bold;
    border-style: solid;
    border-radius: 30px;
    margin: 20px;
    margin-bottom: 0;
  }
`;
