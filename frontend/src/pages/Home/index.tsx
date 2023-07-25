import Messages from "../../components/home/messages"
import Friends from "../../components/home/friends"
import styled from "styled-components"
import AuthHook from "../../data/hooks/AuthHook"
import { Navigate } from "react-router-dom"

const Container = styled.div`
  height: 100%;
  display: flex;
  margin-top: 30px;
  width: 100%;
`

const Home = () => {
  const { logged, user } = AuthHook()

  if(!logged || !user) return <Navigate to="/auth/accounts" replace={true} />

  return (
    <Container>
      <Friends />
      <Messages />
    </Container>
  )
}

export default Home