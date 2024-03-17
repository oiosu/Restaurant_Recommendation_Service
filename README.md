# 🍴 또간지도 ( 맛집 소개 서비스) 

> * 프로젝트 기간 : 2024/01 ~ 2024/02
> * 프로젝트 인원 : 프론트엔드 5명, 벡엔드 9명 

#### ✅ 목표 및 소개 ( 프론트엔드 지도 페이지 담당 ) 

* Kakao Map API를 활용하여 '키워드로 장소 검색하고 목록으로 표출하기' 기능을 구현
* useState 를 사용하여 맛집 정보와 검색 키워드를 관리
* useEffect를 이용하여 검색어가 변경될 때 마다 지도를 갱신하고 맛집 정보 관리
* 검색 결과를 지도에 표시하고 페이지네이션을 구현
* 검색어를 입력이 발생할때마다 handleInputChange 함수를 호출하여 검색 키워드 업데이트
* JSX를 통해 UI를 렌더링 하고 스타일링은 styled-components를 이용하여 적용  
---

### ✅ [프로젝트 프론트엔드 Github](https://github.com/SupercodingProject-3th/FRONT-END) 
### ✅ [프로젝트 벡앤드 Github](https://github.com/supercoding-3st-project/food-place-BE)

---

> `0211PJT` 프로젝트 개인 폴더 생성하여 미리 테스트 후 프론트엔드 프로젝트에 옮긴 후 다시 테스트 해보는 작업 진행
>
> SuperCoding PJT03 Figma
>
> ![image](https://github.com/oiosu/React-map/assets/99783474/8f62a943-1496-4eb4-8fc2-c4102e90196b)


```bash
$ npm install typescript @types/node @types/react @types/react-dom @types/jest
```
> ◾ TypeScript와 관련 타입 정의 파일을 설치
>
> TypeScript로 작성된 코드에서 각 라이브러리를 사용할 때 TypeScript 컴파일러가 타입 체크를 수행 가능
> 
> TypeScript 및 관련 라이브러리를 프로젝트에 설치
> 
> 해당 패키지들이 프로젝트의 node_modules 폴더에 설치

```bash
$ npx create-react-app mapmain —template typescript
```
> ◾ TypeScript를 사용하여 React 애플리케이션을 생성
>
> mapmain은 애플리케이션 이름이며 --template typescript는 TypeScript를 사용하여 React 애플리케이션을 생성
>
> React 애플리케이션의 기본 구조와 TypeScript 구성이 설정된 프로젝트가 생성
>   

```bash
$ npm install --save @types/kakaomaps
```

```bash
$ npm i --save-dev @types/styled-components
```

> typescript에서 오류없이 사용하기 위해서는 styled-component의 type들을 가지고 와야한다.

```bash
$ npm install react-icons --save
```

```react
import { FaMapLocationDot } from "react-icons/fa6";
...
<FaMapLocationDot />
...
```
`https://react-icons.github.io/react-icons/icons/fa6/`

* 기존 프로젝트에서 추가 설치
```json
   "@fortawesome/react-fontawesome": "^0.2.0",
    "@types/kakaomaps": "^1.1.5",
    "react-icon": "^1.0.0",
    "react-kakao-maps-sdk": "^1.1.26"
```

---

![image](https://github.com/oiosu/React-map/assets/99783474/99b5f019-2758-47ab-a9d0-eecca17f4ef8)


### ✅ 전체 코드 

```typescript
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaMapLocationDot } from "react-icons/fa6";
import MapGuide from "./MapGuide";

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
  // address_name?: string;
  phone?: number;
}

// MapContainer 컴포넌트 정의
const MapContainer: React.FC = () => {
  // useState 를 사용하여 맛집 정보 places 와 검색 키워드 searchKeyword 관리
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
          '<div style="text-decoration:none; padding:5px; text-align:center; font-size:12px; font-weight:bold;">' +
            '<a href="https://map.kakao.com/link/map/' +
            place.place_name +
            "," +
            place.y +
            "," +
            place.x +
            '">' +
            place.place_name +
            "</a>" +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  }, [searchKeyword]);
  // 검색어가 변경될때마다  handleInputChange 함수를 호출하여 적용하기
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
          <MapGuide />
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
                {/* <span>{index + 1}</span> */}
                <Info>
                  <p className="place_name">🍴{place.place_name}</p>
                  {place.road_address_name ? (
                    <div>
                      <p className="place_address">{place.road_address_name}</p>
                    </div>
                  ) : (
                    <p>{place.road_address_name}</p>
                  )}
                  <p className="place_phone">{place.phone}</p>
                </Info>
              </div>
            ))}
          </div>
        </StyledList>
        <StyledPagination>
          <div id="pagination"></div>
        </StyledPagination>
      </StyledMapMainContainer>
    </div>
  );
};

export default MapContainer;


```

---






