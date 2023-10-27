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
  usersOnline: string[]
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

const AuthProvider = ({ children }: ProviderProps) => {
  const [logged, setLogged] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  const [user, setUser] = useState<User | null>(null)
  const [friends, setFriends] = useState<FriendsWithMessages[]>([])
  const [usersOnline, setUsersOnline] = useState<string[]>([])
  const [friendSelected, setFriendSelected] = useState<FriendsWithMessages | null>(null)

  const signInWithAccount = (user: User) => {
    setUser(user)
    setLogged(true)
    socket.emit("logged", user._id)
  }

  useEffect(() => {
    if (user && user._id) getFriends(user)
  }, [user])

  useEffect(() => {
    socket.on("users-online", (users: string[]) => {
      setUsersOnline(users)
    })

    // console.log(friends)

    // socket.on("message-received", (data: Message) => {
    //   // setFriends(msgs => [...msgs, data])
    //   console.log(friends)
    //   const friend = friends.find(f => f._id === data.recipient || f._id === data.sender)
    //   console.log(data)
    //   if(friend){
    //     friend.messages.push(data)
    //     setFriends(prevFriends=> ({ ...prevFriends, friend }))
    //   }
    // })

    return () => { 
      socket.off("users-online") 
      socket.off("message-received") 
    }
  }, [])

  useEffect(() => {
    socket.on("message-received", (data: Message) => {
      console.log(friends);
      const friend = friends.find((f) => f._id === data.recipient || f._id === data.sender);
      console.log(data);
      if (friend) {
        friend.messages.push(data);
        setFriends((prevFriends) => {
          const updatedFriends = [...prevFriends];
          const friendIndex = updatedFriends.findIndex((f) => f._id === friend._id);
          if (friendIndex !== -1) {
            updatedFriends[friendIndex] = friend;
          }
          return updatedFriends;
        });
      }
    });
  
    return () => {
      socket.off("message-received");
    };
  }, [friends]);
  

  useEffect(()=> {
    console.log("aaafoda")
    console.log(friends)
  }, [friends])


  const signIn = async (name: string, password: string) => {
    try {
      const resp = await api.post("/login", { name, password })
      const data: User = resp.data

      if (data && data.name) {
        setUser(data)
        window.app.send("set-users", data)
        setLogged(true)
        getFriends(data)
        socket.emit("logged", data._id)
      } else {
        console.log(data)
      }
    } catch (e: any) {
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
    setFriendSelected(friend)
  }

  const getFriends = async (user: User) => {
    if (user?._id) {
      try {
        const resp = await api.get(`/messages/${user._id}`)
        const data: FriendsWithMessages[] = resp.data
        if (data) {
          setFriends(data)
          data.map(f => {
            socket.emit("join-room", { id1: user!._id, id2: f._id })
          })
        }
        // setFriendSelected(data[0])
      } catch (e: any) {
        console.log(e)
      }
    }
  }

  return (
    <AuthContext.Provider value={{
      usersOnline,
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