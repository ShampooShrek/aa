import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import route from "./router"
import http from "http"
import { Server } from "socket.io"

mongoose.connect("mongodb://mongodb/Chat")
  .then(_ => console.log("Conectado ao banco de dados"))

const app = express()

const serverHttp = http.createServer(app)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(route)


export { serverHttp, app }