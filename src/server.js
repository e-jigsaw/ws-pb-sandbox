const Message = require('../proto/message_pb.js')
const WebSocket = require('ws')
const wss = new WebSocket.Server({
  port: 9997
})

wss.on('connection', ws => {
  ws.on('message', msg => {
    const req = Message.Request.deserializeBinary(Uint8Array.from(msg))
    switch (req.getKindCase()) {
      case 1: {
        const echoRequest = req.getEchorequest()
        const echoResponse = new Message.EchoResponse()
        echoResponse.setMessage(echoRequest.getMessage())
        const res = new Message.Response()
        res.setEchoresponse(echoResponse)
        ws.send(res.serializeBinary())
        break
      }
      case 2: {
        const timeResponse = new Message.TimeResponse()
        timeResponse.setTime(Date.now())
        const res = new Message.Response()
        res.setTimeresponse(timeResponse)
        ws.send(res.serializeBinary())
        break
      }
    }
  })
})
