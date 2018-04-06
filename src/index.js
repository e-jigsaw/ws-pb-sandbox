import Message from '../proto/message_pb.js'

console.log(Message)

const ws = new WebSocket('ws://localhost:9997')

ws.addEventListener('open', event => {
  console.log(event)
})
ws.addEventListener('message', event => {
  const reader = new FileReader()
  reader.onload = () => {
    const repEcho = Message.RepEcho.deserializeBinary(new Uint8Array(reader.result))
    console.log(repEcho.getMessage())
  }
  reader.readAsArrayBuffer(event.data)
})

document.getElementById('button').addEventListener('click', event => {
  const reqEcho = new Message.ReqEcho()
  reqEcho.setMessage('clicked')
  ws.send(reqEcho.serializeBinary())
})
