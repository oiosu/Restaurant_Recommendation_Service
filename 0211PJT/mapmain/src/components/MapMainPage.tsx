import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaMapLocationDot } from "react-icons/fa6";
declare global {
  interface Window {
    kakao: any;
  }
}

interface Pagination {
  last: number;
  current: number;
  gotoPage: (pageNumber: number) => void;
}

interface Place {
  x: number;
  y: number;
  place_name: string;
  road_address_name?: string;
  address_name?: string;
  phone?: number;
}

const MapContainer: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [searchKeyword, setSearchKeyword] =
    useState<string>("맛집을 검색해보세요");

  useEffect(() => {
    const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
    // const markers = [];
    const mapOption = {
      center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3,
    };
    const map = new window.kakao.maps.Map(
      document.getElementById("map"),
      mapOption
    );
    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(searchKeyword, placesSearchCB);

    function placesSearchCB(data: any[], status: any, pagination: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        const bounds = new window.kakao.maps.LatLngBounds();
        setPlaces(data);

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
        displayPagination(pagination);
        setPlaces(data);
      }
    }

    function displayPagination(pagination: Pagination): void {
      const paginationEl = document.getElementById("pagination");
      const fragment = document.createDocumentFragment();

      while (paginationEl?.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild!);
      }

      for (let i = 1; i <= pagination.last; i++) {
        const el = document.createElement("a");
        el.href = "#";
        el.innerHTML = i.toString();

        if (i === pagination.current) {
          el.className = "on";
        } else {
          el.onclick = (function (pageNumber: number) {
            return function () {
              pagination.gotoPage(pageNumber);
            };
          })(i);
        }

        fragment.appendChild(el);
      }

      paginationEl?.appendChild(fragment);
    }

    function displayMarker(place: Place) {
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });

      window.kakao.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px; font-weight:bold; ">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  }, [searchKeyword]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <div>
      <StyledMapMainContainer>
        <StyledMapLocationDot>
          <FaMapLocationDot />
        </StyledMapLocationDot>
        <StyledMapTitle>
          <span>또간지도</span>
        </StyledMapTitle>

        <StyledInput
          type="text"
          value={searchKeyword}
          onChange={handleInputChange}
          placeholder="맛집을 검색해보세요"
        />
        <StyledMap id="map">
          <div></div>
        </StyledMap>
        <StyledList>
          <div id="result-list">
            {places.map((place, index) => (
              <div key={index} style={{ marginTop: "20px" }}>
                <span>{index + 1}</span>
                <div>
                  <h5>{place.place_name}</h5>
                  {place.road_address_name ? (
                    <div>
                      <span>{place.road_address_name}</span>
                      <span>{place.address_name}</span>
                    </div>
                  ) : (
                    <span>{place.address_name}</span>
                  )}
                  <span>{place.phone}</span>
                </div>
              </div>
            ))}
            <div id="pagination"></div>
          </div>
        </StyledList>
      </StyledMapMainContainer>
    </div>
  );
};

export default MapContainer;

const StyledList = styled.ul`
  margin-top: 20px;
  margin-bottom: 150px;
  list-style: none;
  width: 1200px;
  background-color: beige;

  li {
    padding-top: 10px;
    padding-bottom: 10px;
    height: 30px;
    list-style: none;
  }
`;

const StyledMapMainContainer = styled.div`
  margin-top: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledMapTitle = styled.span`
  font-size: 25px;
  font-weight: bold;
  margin-right: 30px;
`;

const StyledInput = styled.input`
  width: 500px;
  height: 40px;
  border-radius: 30px;
  border-style: none;
  background-color: #feaa00;
  color: #fff;
  padding-left: 20px;
  font-weight: 700;
  font-size: 18px;
  margin-top: 30px;
`;
const StyledMapLocationDot = styled(FaMapLocationDot)`
  color: #feaa00;
  font-size: 40px;
  margin-right: 20px;
  padding-bottom: 10px;
`;

const StyledMap = styled.div`
  margin-top: 50px;
  width: 1200px;
  height: 480px;
  border-radius: 20px;
  border-style: solid;
  border-color: #feaa00;
`;
