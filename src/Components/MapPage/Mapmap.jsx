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

  const RoadContent = () => (
    <RoadInfo className="roadview_info">
      <MapName className="map_name">월정리 해수욕장</MapName>
      <AnotherInfo>
        <CarInfo className="car_info">주차가능</CarInfo>
      </AnotherInfo>
    </RoadInfo>
  );

  return (
    <>
      <MapBody>
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
              <RoadContent />
            </CustomOverlayRoadview>
          </Roadview>
        </StyledMapContainer>
      </MapBody>
    </>
  );
}

// Styled components
const MapBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 900px;
  height: 650px;
  margin-left: 375px;
  margin-bottom: 300px;
`;

const StyledMapContainer = styled.div`
  width: 100%;
  height: 300px;
`;

const OverlayInfo = styled.div`
  &.overlay_info {
    background-color: #ffbe3c;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    border-style: none;
    margin-top: 30px;
  }
`;

const RoadInfo = styled.div`
  &.roadview_info {
    background-color: #f7f4ef;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    border-style: none;
    margin-top: 30px;

    .map_name {
      font-size: 15px;
      color: #000;
      font-weight: bold;
      text-decoration: none;
    }

    .walk_inf {
      // CarInfo 스타일 추가
    }
  }
`;

const MapName = styled.strong`
  &.map_name {
    font-size: 15px;
    color: #000;
    font-weight: bold;
    text-decoration: none;
  }
`;

const Desc = styled.div`
  &.desc {
    margin-top: 10px;
  }
`;

const Address = styled.p`
  &.address {
    font-size: 15px;
    color: #000;
  }
`;

const Telephone = styled.p`
  &.telephone {
    font-size: 15px;
    color: #000;
  }
`;

const CarInfo = styled.span`
  &.car_info {
    font-size: 15px;
    color: #000;
  }
`;

const AnotherInfo = styled.div`
  &.another_info {
    // 스타일 추가
  }
`;
