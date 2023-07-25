import styled from "styled-components"

interface StyledProps {
  status: "online" | "offline"
}

export const Container = styled.div`
  width: 25%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #22272F;
`

export const Friends = styled.div`
  cursor: pointer;
  width: 100%;
  height: 80px;
  padding: 10px;
  display: flex;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 2px solid #404B5C;
  }

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }

  p {
    font-size: .8rem;
    color: #fff;
  }

  &:hover {
    background-color: #404B5C;
  }
`

export const FriendsImage = styled.div`
  position: relative;
  margin-right: 20px;

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }
`

export const Status = styled.div<StyledProps>`
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: 10px;
  height: 10px;
  border: 2px solid black;
  border-radius: 50%;
  background-color: ${props => props.status === "offline" ? "red" : "green"};
`