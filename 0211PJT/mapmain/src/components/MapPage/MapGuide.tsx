import React, { Component } from "react";
import styled from "styled-components";

interface MapGuideState {
  isModalOpen: boolean;
}

export default class MapGuide extends Component<{}, MapGuideState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    return (
      <MapGuideContainer>
        <button onClick={this.openModal}>지도검색방법</button>
        <button>맛집제보방법</button>

        {this.state.isModalOpen && (
          <Modal>
            {/* 모달 내용 */}
            <div>
              <p>지도검색 방법 내용</p>
              <button onClick={this.closeModal}>닫기</button>
            </div>
          </Modal>
        )}
      </MapGuideContainer>
    );
  }
}

const MapGuideContainer = styled.div`
  button {
    padding: 10px;
    background-color: #fff;
    color: #feaa00;
    font-weight: bold;
    border-style: solid;
    border-color: #feaa00;
    border-radius: 30px;
    margin: 20px;
    margin-bottom: 0;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  div {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
  }
`;
