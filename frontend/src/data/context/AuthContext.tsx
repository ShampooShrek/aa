import { createContext, useEffect, useState } from "react";
import { User, Friends, Message, FriendsWithMessages } from "../../models/User"; 
import api from "../../lib/axios";
import socket from "../../lib/socket";

interface ContextProps {
  loading: boolean
  logged: boolean
  user: User | null
  friends: FriendsWithMessages[] | null
  friendSelected: FriendsWithMessages | null
  signInWithAccount(user: User): void
  signIn(name: string, password: string): Promise<void>
  getFriends(user: User): Promise<void>
  signOut(): void
  selectFriend(friend: FriendsWithMessages): void
}

interface ProviderProps {
  children: React.ReactNode
} 

export const AuthContext = createContext<ContextProps>({} as ContextProps)

const AuthProvider = ({children}: ProviderProps) => {
  const [logged, setLogged] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  const [user, setUser] = useState<User | null>(null)
  const [friends, setFriends] = useState<FriendsWithMessages[]>([])
  const [friendSelected, setFriendSelected] = useState<FriendsWithMessages | null>(null)

  const signInWithAccount = (user: User) => {
    setUser(user)
    setLogged(true)
    socket.emit("logged", user._id)
  }

  useEffect(() => {
    if(user && user._id) getFriends(user)
  }, [user])

  const signIn = async (name: string, password: string) => {
    try {
      const resp = await api.post("/login", { name, password })
      const data: User = resp.data

      if(data && data.name) {
        setUser(data)
        window.app.send("set-users", data)
        setLogged(true)
        getFriends(data)
        socket.emit("logged", data._id)
      } else {
        console.log(data)
      }
    } catch(e: any) {
      console.log(e)
    }
  }

  const signOut = () => {
    setUser(null)
    setFriendSelected(null)
    setFriends([])
    setLogged(false)
  }

  const selectFriend = (friend: FriendsWithMessages) => {
    socket.emit("join-room", { id1: user?._id, id2: friend._id })
    setFriendSelected(friend)
  }

  const getFriends = async (user: User) => {
    console.log("getFriends")
    if(user?._id) {
      try {
        const resp = await api.get(`/messages/${user._id}`)
        const data: FriendsWithMessages[] = resp.data
        if(data) {
          setFriends(data)
        }
      } catch(e: any) {
        console.log(e)
      }
    } else {
      console.log("aaaa")
    } 
  } 

  return (
    <AuthContext.Provider value={{
      friends,
      friendSelected,
      getFriends,
      loading,
      logged,
      selectFriend,
      signIn,
      signInWithAccount,
      signOut,
      user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider