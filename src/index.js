import Message from '../proto/message_pb.js'

const ws = new WebSocket('ws://localhost:9997')

ws.addEventListener('open', event => {
  // eslint-disable-next-line no-console
  console.log(event)
})
ws.addEventListener('message', event => {
  const reader = new FileReader()
  reader.onload = () => {
    const res = Message.Response.deserializeBinary(
      new Uint8Array(reader.result)
    )
    switch (res.getKindCase()) {
      case 1: {
        // eslint-disable-next-line no-console
        console.log(`echo response: ${res.getEchoresponse().getMessage()}`)
        break
      }
      case 2: {
        // eslint-disable-next-line no-console
        console.log(
          `time response: ${new Date(res.getTimeresponse().getTime())}`
        )
        break
      }
    }
  }
  reader.readAsArrayBuffer(event.data)
})

document.getElementById('button').addEventListener('click', () => {
  const echoReq = new Message.EchoRequest()
  echoReq.setMessage('clicked')
  const req = new Message.Request()
  req.setEchorequest(echoReq)
  ws.send(req.serializeBinary())
})

document.getElementById('timeButton').addEventListener('click', () => {
  const timeReq = new Message.TimeRequest()
  const req = new Message.Request()
  req.setTimerequest(timeReq)
  ws.send(req.serializeBinary())
})
