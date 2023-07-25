import styled from "styled-components";


export const Container = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
`

export const Card = styled.div`
  padding: 30px;
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  width: 300px;
  background-color: #333;
  border-radius: 5px;
`

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;


  input { 
    width: 80%;
    outline: 0;
    border: 1px solid #000;
    border-radius: 5px;
    padding: 10px;
    font-size: 1.2rem;
  }

  small {
    text-align: start;
    margin-bottom: 5px;
  }

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  button {
    width: 150px;
    padding: 10px 0;
    font-size: 1.2rem;
    text-align: center;
  }
`