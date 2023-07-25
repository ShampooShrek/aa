import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import AuthHook from "../../../data/hooks/AuthHook"
import * as S from "./style"

type SignInData = {
  password: string
  name: string
}

const SignIn = () => {
  const { logged, user, signIn } = AuthHook()

  const [data, setData] = useState<SignInData>({password: "", name: ""})

  const handleInput = (ev: any) => {
    const name = ev.target.name
    setData({ ...data, [name]: ev.target.value })
  }

  const handleSignIn = async () => {
    await signIn(data.name, data.password)
    return <Navigate to="/" replace={true} />
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  if(logged || user) return <Navigate to="/" replace={true} />

  return (
    <S.Container>
      <S.Card>
        <S.Title>SignIn</S.Title>
        <S.Form>
          <S.InputGroup>
            <small>Name:</small>
            <input type="text" name="name" onChange={ev => handleInput(ev)} />
          </S.InputGroup>
          <S.InputGroup>
            <small>Password:</small>
            <input type="password" name="password" onChange={ev => handleInput(ev)} />
          </S.InputGroup>
        </S.Form>
        <S.ButtonContainer>
          <button onClick={() => handleSignIn()}></button>
        </S.ButtonContainer>
      </S.Card>
    </S.Container>
  )
}

export default SignIn