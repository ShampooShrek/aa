import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: String,
  perfilImage: String,
  password: { type: String, required: true },
  friends: [{type: Schema.ObjectId, ref: "User" }],
  messages: [{ type: Schema.ObjectId, ref: "Message" }],
  lastLoggedIn: {type: Date, default: null}
})

const MessageSchema = new Schema({
  sender: { type: Schema.ObjectId, ref: "User", required: true },
  recipient: { type: Schema.ObjectId, ref: "User", required: true },
  type: String,
  content: String,
  date: { type: Date, default: Date.now() }
})

const RoomsSchema = new Schema({
  key: String,
  date: { type: Date, default: Date.now() }
})

export const User = model("User", UserSchema)
export const Message = model("Message", MessageSchema)
export const Rooms = model("Rooms", RoomsSchema)