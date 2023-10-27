import { Navigate } from "react-router-dom"
import AuthHook from "../../../data/hooks/AuthHook"
import * as S from "./style"
import { useEffect, useState } from "react"
import { FriendsWithMessages } from "../../../models/User"
import socket from "../../../lib/socket"

interface FriendsOnline extends FriendsWithMessages {
  status: "online" | "offline"
}

const Friends = () => {
  const { selectFriend, logged, user, friends, usersOnline } = AuthHook()
  const [friendsOnline, setFriendsOnline] = useState<FriendsOnline[]>([])

  useEffect(() => {
    const newFriendsOnline: FriendsOnline[] = friends ? friends.map(friend => {
      return {
        ...friend,
        status: usersOnline.includes(friend._id) ? "online" 
        : "offline"
      }
    }) : []
    setFriendsOnline(newFriendsOnline)
  }, [usersOnline, friends])

  if(!user || !logged) return <Navigate to="/auth/accounts" />

  const RenderFriends = () => {
    if(friendsOnline && friendsOnline.length) {
      return (
        <>
          {friendsOnline.map(friend => {
            return (
              <S.Friends onClick={() => selectFriend(friend)}
              key={friend.perfilImage}>
                <S.FriendsImage>
                <img src={friend.perfilImage} alt="" />
                <S.Status status={friend.status}></S.Status>
                </S.FriendsImage>
                <p>{friend.name}</p>
              </S.Friends>
            )
          })}
        </>
      )
    } else {
      return <h1>Adicione um amigo!!</h1>
    }
  }

  return (
    <S.Container>
      <RenderFriends />
    </S.Container>
  )
}

export default Friends