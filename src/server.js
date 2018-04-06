const Message = require('../proto/message_pb.js')
const WebSocket = require('ws')
const wss = new WebSocket.Server({
  port: 9997
})

wss.on('connection', ws => {
  ws.on('message', msg => {
    const reqEcho = Message.ReqEcho.deserializeBinary(Uint8Array.from(msg))
    const repEcho = new Message.RepEcho()
    repEcho.setMessage(reqEcho.getMessage())
    ws.send(repEcho.serializeBinary())
  })
})
