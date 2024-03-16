# 🍴 또간지도 ( 맛집 소개 서비스) 

> * 프로젝트 기간 : 2024/01 ~ 2024/02
> * 프로젝트 인원 : 프론트엔드 5명, 벡엔드 9명 

---
### ✅ [프로젝트 프론트엔드 Github](https://github.com/SupercodingProject-3th/FRONT-END) 
---

#### ✅ 목표 및 소개 

* Kakao Map API를 활용하여 '키워드로 장소 검색하고 목록으로 표출하기' 기능을 구현
* useState 를 사용하여 맛집 정보와 검색 키워드를 관리
* useEffect를 이용하여 검색어가 변경될 때 마다 지도를 갱신하고 맛집 정보 관리
* 검색 결과를 지도에 표시하고 페이지네이션을 구현
* 검색어를 입력이 발생할때마다 handleInputChange 함수를 호출하여 검색 키워드 업데이트
* JSX를 통해 UI를 렌더링 하고 스타일링은 styled-components를 이용하여 적용  

![image](https://github.com/oiosu/React-map/assets/99783474/99b5f019-2758-47ab-a9d0-eecca17f4ef8)



---


# 🍴 Map Main Page

## 키워드로 장소검색하고 목록으로 표출하기
![image](https://github.com/oiosu/React-map/assets/99783474/5064a32b-e7d2-443e-818e-4bed4112387c)


> 키워드로 장소를 검색하면 검색결과를 목록과 마커로 표시합니다. 목록과 마커에 마우스오버 하면 해당 장소를 표시하고 있는 마커에 인포윈도우로 장소명을 표시합니다.

### Settings

```bash
$ npx create-react-app mapmain —template typescript
```
* `map` 폴더안에 typescript 버전의 create-react-app이 생성

```bash
$ cd mapmain
```

![image](https://github.com/oiosu/React-map/assets/99783474/65d87b0c-73d6-4663-9a39-58b76bb3dcf3)


```bash
$ npm install typescript @types/node @types/react @types/react-dom @types/jest
```

```html
 <!-- kakao map api  : index.html 에 `<script>`  `app key` 추가하기 -->
  <script
      type="text/javascript"
      src="//dapi.kakao.com/v2/maps/sdk.js?appkey=your_app_key_here_&libraries=services,clusterer"
    ></script>
```

```typescript
  "compilerOptions": {
     ...
    "types": ["kakao.maps.d.ts"],
     ...
  }
```

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


### 전체 코드 

```typescript
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

//...

export default MapContainer;
```

---

### 화면구현 

![image](https://github.com/oiosu/React-map/assets/99783474/a2da879d-1ed0-4f9f-b895-60aaae684de5)

