import styled from "styled-components";

interface StyledProps {
  position: "left" | "right"
}

export const Container = styled.div`
  width: 75%;
  height: 100%;
`

export const MessagesContainer = styled.div`
  display: block;
  width: 100%;
  height: calc(100% - 70px);
  overflow-y: scroll;
  overflow-x: hidden;
`

export const Message = styled.div<StyledProps>`  
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  justify-content: ${props => props.position};

  span {
    padding: 10px;
    margin: 0 20px;
    border-radius: 10px;
    max-width: 45%;
    word-wrap: normal;
    text-align: ${props => props.position};
    background-color: ${props => props.position === "left" ? "#4A5772" : "#1F2531"}; 
  }
`

export const InputContainer = styled.div`
  background-color: #22272F;
  height: 60px;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 75%;
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    border-radius: 5px;
    color: #000;
    width: 80%;
    padding: 10px;
    outline: 0;
    border: 0;
    font-size: 1.2rem
  }
`