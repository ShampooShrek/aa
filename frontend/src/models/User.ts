export interface User {
  _id: string
  name: string
  perfilImage: string
  password: string
  lastLoggedIn: Date | null
}

export interface Message {
  _id: string
  content: string
  type: string
  sender: string
  recipient: string
  date: Date
}

export interface Friends {
  _id: string
  name: string
  perfilImage: string
  lastLoggedIn: Date | null
}

export interface FriendsWithMessages extends Friends {
  messages: Message[]
}