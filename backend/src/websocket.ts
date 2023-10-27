import { Server } from "socket.io"
import { serverHttp, app } from "./http"
import { NextFunction, Request, Response } from "express"
import { Message, Rooms, User } from "./models/User"

const io = new Server(serverHttp, {cors: {}})

interface Users {
  socket_id: string
  userId: string
}

interface Message {
  sender: string
  recipient: string
  type: string
  content: string
  date: Date
}

const users: Users[] = []
const usersIdOnline: string[] = []

io.on("connection", socket => {
  socket.on("logged", (userId/* callback */) => { 
    const userExistsInServer = users.find(user => user.userId === userId)

    if(userExistsInServer) userExistsInServer.socket_id = socket.id
    else {
      users.push({ socket_id: socket.id, userId })
      usersIdOnline.push(userId)
    } 
    
    io.emit("users-online", usersIdOnline)
    // callback(usersIdOnline)
  })

  socket.on("join-room", async ({ id1, id2 }) => {
    const idRoom = [id1, id2].sort()
    const foda = `${idRoom[0]}-${idRoom[1]}`

    const existsRoom = await Rooms.find({ key: foda })

    if(existsRoom.length > 0) socket.join(foda)
    else {
      await Rooms.create({ key: foda })
      socket.join(foda)
    }

    socket.emit("join-room", foda)
  })

  socket.on("send-message", async (message: Message, roomId: string) => {
    const { content, recipient, sender, type } = message

    const createMessage = await Message.create({
      content,
      type,
      recipient,
      sender
    })
  
    await User.findByIdAndUpdate(sender, { $push: { messages: createMessage._id } })
    await User.findByIdAndUpdate(recipient, { $push: { messages: createMessage._id } })

    io.to(roomId).emit("message-received", createMessage)
  })

  socket.on("disconnect", () => {
    const disconnectUserIndex = users.findIndex(u => u.socket_id === socket.id);
  
    if (disconnectUserIndex !== -1) {
      const userId = users[disconnectUserIndex].userId;
      users.splice(disconnectUserIndex, 1);
  
      const onlineUserIndex = usersIdOnline.findIndex(u => u === userId);
      if (onlineUserIndex !== -1) {
        usersIdOnline.splice(onlineUserIndex, 1);
      }
    }  
    io.emit("users-online", usersIdOnline);
  });

})

export const IoMildleware= (req: Request, res: Response, next: NextFunction) => {
  req.body.io = io
  next();
}

export default io