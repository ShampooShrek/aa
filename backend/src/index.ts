import { serverHttp } from "./http"
import "./websocket"

const port = 3001

serverHttp.listen(port, () => console.log(`Backend rodando na porta ${port}`))