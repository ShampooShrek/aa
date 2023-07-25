import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Account from "../pages/auth/Accounts"
import SignIn from "../pages/auth/SignIn"


const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/accounts" element={<Account />} />
      <Route path="/auth/signIn" element={<SignIn />} />
    </Routes>
  )
}

export default Router