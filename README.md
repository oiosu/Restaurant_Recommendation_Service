# 🍴 또간지도 ( 맛집 소개 서비스) 

> * 프로젝트 기간 : 2024/01 ~ 2024/02
> * 프로젝트 인원 : 프론트엔드 5명, 벡엔드 9명 

---
### ✅ [프로젝트 프론트엔드 Github](https://github.com/SupercodingProject-3th/FRONT-END) 
---

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


#### ✅ 목표 및 소개 

* Kakao Map API를 활용하여 '키워드로 장소 검색하고 목록으로 표출하기' 기능을 구현
* useState 를 사용하여 맛집 정보와 검색 키워드를 관리
* useEffect를 이용하여 검색어가 변경될 때 마다 지도를 갱신하고 맛집 정보 관리
* 검색 결과를 지도에 표시하고 페이지네이션을 구현
* 검색어를 입력이 발생할때마다 handleInputChange 함수를 호출하여 검색 키워드 업데이트
* JSX를 통해 UI를 렌더링 하고 스타일링은 styled-components를 이용하여 적용  

![image](https://github.com/oiosu/React-map/assets/99783474/99b5f019-2758-47ab-a9d0-eecca17f4ef8)



---






