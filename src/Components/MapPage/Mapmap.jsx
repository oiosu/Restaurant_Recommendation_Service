import React, { useRef } from "react";
// kakao map
import {
  Map,
  Roadview,
  CustomOverlayMap,
  CustomOverlayRoadview,
} from "react-kakao-maps-sdk";
// style
import styled from "styled-components";

export default function MapComponent() {
  const roadviewRef = useRef();

  const Content = () => (
    <OverlayInfo className="overlay_info">
      <a
        href="https://place.map.kakao.com/17600274"
        target="_blank"
        rel="noreferrer"
      >
        <MapName className="map_name">월정리 해수욕장</MapName>
      </a>
      <Desc>
        <Address className="address">
          제주특별자치도 제주시 구좌읍 월정리 33-3
        </Address>
        <Telephone className="telephone">대표 번호 : 070-777-777</Telephone>
      </Desc>
    </OverlayInfo>
  );

  return (
    <>
      <StyledMapContainer>
        <Map
          center={{
            lat: 33.5563,
            lng: 126.7958,
          }}
          style={{
            width: "100%",
            height: "300px",
          }}
          level={3}
        >
          <CustomOverlayMap
            position={{
              lat: 33.55635,
              lng: 126.795841,
            }}
            xAnchor={1.1}
            yAnchor={0.5}
          >
            <Content />
          </CustomOverlayMap>
        </Map>
      </StyledMapContainer>

      <StyledMapContainer>
        <Roadview
          position={{
            lat: 33.5563,
            lng: 126.7958,
            radius: 50,
          }}
          style={{
            width: "100%",
            height: "300px",
          }}
          ref={roadviewRef}
        >
          <CustomOverlayRoadview
            position={{
              lat: 33.55635,
              lng: 126.795841,
            }}
            xAnchor={0.5}
            yAnchor={0.5}
            onCreate={(overlay) => {
              const roadview = roadviewRef.current;
              const projection = roadview.getProjection();
              const viewpoint = projection.viewpointFromCoords(
                overlay.getPosition(),
                overlay.getAltitude()
              );
              roadview.setViewpoint(viewpoint);
            }}
          >
            <Content />
          </CustomOverlayRoadview>
        </Roadview>
      </StyledMapContainer>
    </>
  );
}

// Styled components
const StyledMapContainer = styled.div`
  width: 100%;
  height: 300px;
`;

const OverlayInfo = styled.div`
  &.overlay_info {
    background-color: #fff;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    margin-top: 30px;
  }
`;

const MapName = styled.strong`
  &.map_name {
    font-size: 18px;
    color: #333;
  }
`;

const Desc = styled.div`
  &.desc {
    margin-top: 10px;
  }
`;

const Address = styled.p`
  &.address {
    color: #555;
  }
`;

const Telephone = styled.p`
  &.telephone {
    color: #555;
  }
`;
