import styled from 'styled-components';

export const Container = styled.div`
  .leaflet-container {
    height: 100vh;
  }
`;

export const ActionsButton = styled.div`
    align-items: center;
    bottom: 60px;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    position: absolute;
    right: 0;
    z-index: 99999;
`;

export const Button = styled.button`
  align-items: center;
  background: #5061fc;
  border-radius: 50%;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: #fff;
  display: flex;
  font-size: 16px;
  font-weight: bold;
  height: 48px;
  justify-content: center;
  padding: 0;
  position: fixed;
  right: 10px;
  text-align: center;
  transition: background 0.2s ease-in;
  width: 48px;
  z-index: 999999;
  @media (min-width: 768px) {
    right: 40px;
  }

  &:first-child {
    bottom: 145px;
  }

  &:nth-child(2) {
    bottom: 90px;
  }

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
