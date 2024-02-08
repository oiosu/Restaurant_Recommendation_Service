import React, { useState, useEffect, useCallback } from "react";

const { kakao } = window;

const MapComponent = () => {
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const [infowindow, setInfowindow] = useState(null);

  const searchPlaces = useCallback(() => {
    const keyword = document.getElementById("keyword").value;

    if (!keyword.trim()) {
      alert("키워드를 입력해주세요!");
      return;
    }

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keyword, placesSearchCB);
  }, []);

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3,
    };
    const newMap = new kakao.maps.Map(mapContainer, mapOption);
    setMap(newMap);

    const newInfowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    setInfowindow(newInfowindow);

    searchPlaces();
  }, [searchPlaces]);

  const placesSearchCB = (data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      displayPlaces(data);
      displayPagination(pagination);
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
    }
  };
  const displayPlaces = (places) => {
    const listEl = document.getElementById("placesList");
    const menuEl = document.getElementById("menu_wrap");
    const bounds = new kakao.maps.LatLngBounds();
    removeAllChildNods(listEl);
    removeMarker();

    places.forEach((place, index) => {
      const placePosition = new kakao.maps.LatLng(place.y, place.x);
      const marker = addMarker(placePosition, index, place.place_name);
      bounds.extend(placePosition);

      marker.addListener("mouseover", () =>
        displayInfowindow(marker, place.place_name)
      );
      marker.addListener("mouseout", () => infowindow.close());

      const itemEl = getListItem(index, place);
      itemEl.addEventListener("mouseover", () =>
        displayInfowindow(marker, place.place_name)
      );
      itemEl.addEventListener("mouseout", () => infowindow.close());

      listEl.appendChild(itemEl);
    });

    map.setBounds(bounds);
    menuEl.scrollTop = 0;
  };

  const addMarker = (position, idx, title) => {
    const imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
    const imageSize = new kakao.maps.Size(36, 37);
    const imgOptions = {
      spriteSize: new kakao.maps.Size(36, 691),
      spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10),
      offset: new kakao.maps.Point(13, 37),
    };
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imgOptions
    );
    const marker = new kakao.maps.Marker({
      position: position,
      image: markerImage,
    });

    marker.setMap(map);
    setMarkers((prevMarkers) => [...prevMarkers, marker]);

    return marker;
  };

  const removeMarker = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  const displayInfowindow = (marker, title) => {
    const content = `<div style="padding:5px;z-index:1;">${title}</div>`;
    infowindow.setContent(content);
    infowindow.open(map, marker);
  };

  const displayPagination = (pagination) => {
    const paginationEl = document.getElementById("pagination");
    removeAllChildNods(paginationEl);

    for (let i = 1; i <= pagination.last; i++) {
      const el = document.createElement("a");
      el.href = "#";
      el.innerHTML = i;

      if (i === pagination.current) {
        el.className = "on";
      } else {
        el.addEventListener("click", () => pagination.gotoPage(i));
      }

      paginationEl.appendChild(el);
    }
  };

  const getListItem = (index, places) => {
    const el = document.createElement("li");
    let itemStr = `<span class="markerbg marker_${index + 1}"></span>
                   <div class="info">
                     <h5>${places.place_name}</h5>`;

    if (places.road_address_name) {
      itemStr += `<span>${places.road_address_name}</span>
                  <span class="jibun gray">${places.address_name}</span>`;
    } else {
      itemStr += `<span>${places.address_name}</span>`;
    }

    itemStr += `<span class="tel">${places.phone}</span>
                </div>`;

    el.innerHTML = itemStr;
    el.className = "item";

    return el;
  };

  const removeAllChildNods = (el) => {
    while (el.hasChildNodes()) {
      el.removeChild(el.lastChild);
    }
  };

  return (
    <div className="map_wrap">
      <div
        id="map"
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      ></div>
      <div id="menu_wrap" className="bg_white">
        <div className="option">
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                searchPlaces();
              }}
            >
              키워드 :{" "}
              <input
                type="text"
                defaultValue="맛집을 검색해주세요"
                id="keyword"
                size="15"
              />
              <button type="submit">검색하기</button>
            </form>
          </div>
        </div>
        <hr />
        <ul id="placesList"></ul>
        <div id="pagination"></div>
      </div>
    </div>
  );
};
export default MapComponent;
