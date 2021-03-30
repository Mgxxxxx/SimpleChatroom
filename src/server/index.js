// 导入WebSocket模块:
const WebSocket = require('ws');

// 引用Server类:
const WebSocketServer = WebSocket.Server;

// 实例化:
const wss = new WebSocketServer({
  port: 12656
});

wss.on('connection', function (ws) {
  console.log(wss.clients.size);
  //ws可以认为是当前连接的scoket
  ws.on('message', function (message) {
    console.log(message);
    wss.clients.forEach((client) => { //遍历所有已连接的socket
      //向非当前的socket连接发送信息
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(`${message}`, (err) => {
          if (err) {
            console.log(`[SERVER] error: ${err}`);
          }
        });
      }
    })
  })
});