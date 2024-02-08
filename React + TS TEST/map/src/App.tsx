import React from "react";
import KakaoMap from "./components/KakaoMap";

type RequiredSearchPlace = {
  searchPlace: string;
};

const App: React.FC<RequiredSearchPlace> = ({ searchPlace }) => {
  return (
    <div className="App">
      <KakaoMap searchPlace={searchPlace} />
    </div>
  );
};

export default App;
