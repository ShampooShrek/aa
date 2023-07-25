import styled from "styled-components";

export const Container = styled.div`
  margin-top: 30px;
  width: 100%;
  height: calc(100vh - 30px);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CardsContainer = styled.div`
  width: 60%;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: start;
`

export const Cards = styled.div`
  width: 200px;
  height: 200px;
  border: 2px solid #000;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const NewAccount = styled.button`
  width: 200px;
  height: 200px;
  border: 2px solid #000;
  cursor: pointer;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 6rem;
  font-weight: 100;
`