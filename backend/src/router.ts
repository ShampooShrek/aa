import { Router, Request, Response } from "express";
import { Message, User } from "./models/User";
import { Server, Socket } from "socket.io";

const route = Router()

type TypeUser = {
  name: string,
  password: string,
  perfilImage: string
}

type TypeMessage = {
  type: string,
  content: string
}

route.post("/users", async (req: Request, res: Response) => {
  const { name, perfilImage, password }: TypeUser = req.body
  const io: Server<Socket, {}> = req.body.io
  if (!name || !perfilImage) return res.status(400).json({ msg: "Nome ou Perfil de Image não definido" })

  const user = await User.create({ name, perfilImage, password })

  return res.status(201).json(user)
})

route.get("/users", async (req: Request, res: Response) => {
  const users = await User.find()
    .populate({
      path: "friends",
      select: "name perfilImage _id"
    })

  return res.status(200).json(users)
})

route.post("/login", async (req: Request, res: Response) => {
  const { name, password }: TypeUser = req.body
  console.log(req.body)

  const userExists = await User.findOne({ name }, 'password name perfilImage')

  if (!userExists) return res.status(400).json({ msg: "Usuario não encontrado" })

  return res.status(200).json(userExists)
})

route.get("/users/getUsers", async (req: Request, res: Response) => {
  const searchString = req.query.search

  try {
    const users = await User.find({ name: { $regex: searchString, $options: 'i' } });

    return res.status(200).json(users)
  } catch (e: any) {
    return res.status(400).json({ msg: e })
  }
})

route.post("/users/:userId/friends/:friendId", async (req: Request, res: Response) => {
  const { userId, friendId } = req.params

  const UserExists = await User.findById(userId)
  const FriendExists = await User.findById(friendId)

  if (!UserExists || !FriendExists) return res.status(400).json({ msg: "Usuario ou Amigo n existente" })

  await User.findByIdAndUpdate(userId, { $push: { friends: FriendExists._id } })
  await User.findByIdAndUpdate(friendId, { $push: { friends: UserExists._id } })

  const UserWithFriends = await User.findById(userId).populate("friends")

  return res.status(200).json(UserWithFriends)
})

route.get("/users/:userId/friends", async (req: Request, res: Response) => {
  const userId = req.params.userId

  const UserExists = await User.findById(userId, "_id").populate({
    path: 'friends',
    select: "name perfilImage _id"
  })

  if (!UserExists) return res.status(400).json({ msg: "Usuario n existe" })

  return res.status(200).json(UserExists)

})

route.get("/messages/:userId/friends/:friendId", async (req: Request, res: Response) => {
  const { userId, friendId } = req.params

  const UserExists = await User.findById(userId)
  const FriendExists = await User.findById(friendId)

  if (!UserExists || !FriendExists) return res.status(400).json({ msg: "Usuario ou Amigo n existente" })

  const messages = await Message.find({
    $or: [
      { sender: userId, recipient: friendId },
      { sender: friendId, recipient: userId }
    ]
  })

  return res.status(200).json(messages)

})

route.get("/messages/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params

  type friend = {
    _id: string
    name: string
    perfilImage: string
  }

  try {
    const userExists = await User.findById(userId, "nothing")
      .populate({ path: "friends", select: "_id name perfilImage" })

    if(!userExists) return res.status(400).json({ msg: "ops, algo deu errado" })

    const { friends } = userExists

    const friendsWithMessages = await Promise.all(
      friends.map(async (friend: any) => {
        const messages = await Message.find({
          $or: [
            { sender: userId, recipient: friend._id },
            { sender: friend._id, recipient: userId },
          ]
        }, "sender recipient type content date")

        return {
          _id: friend._id,
          name: friend.name,
          perfilImage: friend.perfilImage,
          messages
        }
      })
    )

    return res.status(200).json(friendsWithMessages)

  } catch (error) {
    return res.status(500).json({ msg: "Erro ao obter amigos e mensagens", error });
  }
})

export default route