import { Navigate, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { User } from "../../../models/User"
import AuthHook from "../../../data/hooks/AuthHook"
import * as S from "./style"

const Account = () => {
  const { logged, user, signInWithAccount } = AuthHook()
  const [accounts, setAccounts] = useState<User[]>([])

  useEffect(() => {
    window.app.send("get-store", "users")
    window.app.on("resp-store", (event, users: User[]) => {
      console.log(users)
        if(Array.isArray(users)) {
        setAccounts(users)
      } else {
        console.log(users)
      }
    })
  }, [])

  if(logged || user) return <Navigate to={"/"} replace={true} />

  return (
    <S.Container>
      <S.CardsContainer>
        {accounts && accounts.map(account => (
          <S.Cards onClick={() => signInWithAccount(account)} key={account._id} >
            <img src={account.perfilImage}  />
          </S.Cards>
        ))}
        <Link to="/auth/signIn">
          <S.NewAccount>
            +
          </S.NewAccount>
        </Link>
      </S.CardsContainer>
    </S.Container>
  )

}

export default Account