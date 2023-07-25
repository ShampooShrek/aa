import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AuthHook = () => useContext(AuthContext)
 
export default AuthHook