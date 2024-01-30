import React, { useRef } from "react";
import {
  Map,
  Roadview,
  CustomOverlayMap,
  CustomOverlayRoadview,
} from "react-kakao-maps-sdk";
import styled from "styled-components";

export default function MapComponent() {
  const roadviewRef = useRef();

  const Content = () => (
    <div className="overlay_info">
      <a
        href="https://place.map.kakao.com/17600274"
        target="_blank"
        rel="noreferrer"
      >
        <strong>월정리 해수욕장</strong>
      </a>
      <div className="desc">
        <img
          src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/place_thumb.png"
          alt=""
        />
        <p className="address">제주특별자치도 제주시 구좌읍 월정리 33-3</p>
        <p className="telephone">대표 번호 : 070-777-777</p>
      </div>
    </div>
  );

  return (
    <>
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
          xAnchor={0.5}
          yAnchor={1.1}
        >
          <Content />
        </CustomOverlayMap>
      </Map>
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
    </>
  );
}

// 스타일드 컴포넌트 생성
const StyledMap = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;
