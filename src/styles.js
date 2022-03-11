import styled from 'styled-components';

export const Container = styled.div`
  .leaflet-container {
    height: calc(100vh - 48px);
    top: 40px;
  }
`;

export const Button = styled.button`
  background: #5061fc;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  height: 48px;
  position: fixed;
  top: 0;
  transition: background 0.2s ease-in;
  width: 100%;
  z-index: 999999;

  &:hover {
    background: #7c8ffc;
  }

  &:active {
    background: #2c3cfc;
  }

  &:disabled {
    background: #ccc;
    cursor: default;
  }
`
