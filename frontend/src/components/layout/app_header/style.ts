import styled from "styled-components";


export const HeaderContainer = styled.header`
  -webkit-app-region: drag;
  background-color: #282c34;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
`

export const HeaderLogo = styled.h2`
  font-size: 1.5rem;
  color: #FFF;
`

export const ButtonsContainer = styled.div`
  -webkit-app-region: no-drag;
  display: flex;
  width: 150px;
  justify-content: end;
`

export const Button = styled.button`
  color: #FFF;
  height: 30px;
  width: 40px;
  outline: 0;
  border: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  &:hover {
    background-color: #22272F;
  }
`