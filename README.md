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

