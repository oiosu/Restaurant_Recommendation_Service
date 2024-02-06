import React, { useState, useEffect, useRef } from "react";
import { Map } from "react-kakao-maps-sdk";

interface Restaurant {
  name: string;
  address: string;
  phone: string;
  position: { lat: number; lng: number };
}

const RestaurantMarker: React.FC<{
  position: { lat: number; lng: number };
}> = ({ position }) => (
  <div
    style={{
      position: "absolute",
      width: "30px",
      height: "30px",
      backgroundColor: "red",
      borderRadius: "50%",
      border: "2px solid white",
      textAlign: "center",
      color: "white",
      lineHeight: "30px",
    }}
  >
    🍽️
  </div>
);

export default function BasicMap() {
  const [keyword, setKeyword] = useState<string>("");
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchResultsVisible, setSearchResultsVisible] =
    useState<boolean>(true);

  // 지도 ref를 사용하여 지도 인스턴스에 접근할 수 있도록 함
  const mapRef = useRef<any>(null);

  useEffect(() => {
    // 검색 결과가 변경되었을 때 지도 범위를 재설정
    if (restaurants.length > 0 && mapRef.current) {
      const bounds = new window.kakao.maps.LatLngBounds();

      restaurants.forEach((restaurant) => {
        const { lat, lng } = restaurant.position;
        bounds.extend(new window.kakao.maps.LatLng(lat, lng));
      });

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정
      mapRef.current.setBounds(bounds);
    }
  }, [restaurants]);

  const handleSearch = async () => {
    if (!keyword.trim()) {
      alert("키워드를 입력해주세요!");
      return;
    }

    try {
      // TODO: 실제 검색 로직을 추가 (API 호출 등)
      // 여기에서 예시로 dummy 데이터 사용
      const dummyRestaurants: Restaurant[] = [
        {
          name: "레스토랑1",
          address: "서울시 강남구",
          phone: "02-1234-5678",
          position: { lat: 37.123, lng: 127.456 },
        },
        {
          name: "레스토랑2",
          address: "서울시 종로구",
          phone: "02-8765-4321",
          position: { lat: 37.789, lng: 126.123 },
        },
      ];

      if (dummyRestaurants.length === 0) {
        alert("검색 결과가 존재하지 않습니다.");
        setSearchResultsVisible(false);
      } else {
        setRestaurants(dummyRestaurants);
        setSearchResultsVisible(true);
      }
    } catch (error) {
      console.error("검색 중 오류가 발생했습니다.", error);
      alert("검색 중 오류가 발생했습니다.");
      setSearchResultsVisible(false);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      <Map
        id="map"
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        style={{
          width: "100%",
          height: "350px",
        }}
        level={3}
        ref={mapRef}
      >
        {searchResultsVisible &&
          restaurants.map((restaurant, index) => (
            <RestaurantMarker key={index} position={restaurant.position} />
          ))}
      </Map>

      {searchResultsVisible && (
        <div>
          <h2>검색 결과</h2>
          <ul>
            {restaurants.map((restaurant, index) => (
              <li key={index}>
                <strong>{restaurant.name}</strong>
                <p>{restaurant.address}</p>
                <p>{restaurant.phone}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
