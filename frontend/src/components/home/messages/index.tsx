import { useEffect, useRef, useState } from "react"
import AuthHook from "../../../data/hooks/AuthHook"
import * as S from "./style"
import socket from "../../../lib/socket"
import { Message } from "../../../models/User"


const Messages = () => {
  const { friendSelected, user,friends } = AuthHook()

  const pageEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>(friendSelected?.messages ??[])
  const [message, setMessage] = useState<string>("")

  const sendMessage = () => {
    if(message !== "") {
      const data = {
        content: message,
        type: "text",
        sender: user?._id,
        recipient: friendSelected?._id
      }
      const idRoom = [user?._id, friendSelected?._id].sort()
      const foda = `${idRoom[0]}-${idRoom[1]}`
      socket.emit("send-message", data, foda)
      setMessage("")
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [friendSelected, messages]);

  useEffect(() => {
    setMessages(friendSelected?.messages ?? [])
  }, [friendSelected, friends])

  const scrollToBottom = () => {
    if (pageEndRef.current) {
      pageEndRef.current.scrollTo({
        top: pageEndRef.current.scrollHeight,
        behavior: "auto",
      });
    }
  };

  const RenderMessages = () => {
    if(messages) {
      return (
        <>
          {messages.map(message => (
            <S.Message key={message._id} position={message.sender === user?._id ? "right" : "left"} >
              <span>{message.content}</span>
            </S.Message>
          ))}
        </>
      )
    } else {
      return <></>
    }
  }

  return (
    <S.Container >
      <S.MessagesContainer ref={pageEndRef} >
        <RenderMessages />
      </S.MessagesContainer>
      <S.InputContainer>
        <input type="text" value={message}
        onChange={ev => setMessage(ev.target.value)}
        onKeyDown={ev => ev.key === "Enter" && sendMessage()} 
        placeholder="PAPEIE...."/>
      </S.InputContainer>
    </S.Container>
  ) 
}

export default Messages