import Message from '../proto/message_pb.js'

console.log(Message)

const ws = new WebSocket('ws://localhost:9997')

ws.addEventListener('open', event => {
  console.log(event)
})
ws.addEventListener('message', event => {
  const reader = new FileReader()
  reader.onload = () => {
    const res = Message.Response.deserializeBinary(new Uint8Array(reader.result))
    switch (res.getKindCase()) {
      case 1: {
        console.log(`echo response: ${res.getEchoresponse().getMessage()}`)
        break
      }
      case 2: {
        console.log(`time response: ${new Date(res.getTimeresponse().getTime())}`)
        break
      }
    }
  }
  reader.readAsArrayBuffer(event.data)
})

document.getElementById('button').addEventListener('click', event => {
  const echoReq = new Message.EchoRequest()
  echoReq.setMessage('clicked')
  const req = new Message.Request()
  req.setEchorequest(echoReq)
  ws.send(req.serializeBinary())
})

document.getElementById('timeButton').addEventListener('click', event => {
  const timeReq = new Message.TimeRequest()
  const req = new Message.Request()
  req.setTimerequest(timeReq)
  ws.send(req.serializeBinary())
})
