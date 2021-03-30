export default class BaseSocket {
  private socket: WebSocket;
  private data: any;
  constructor(url: string, handleReceiveData: (data: string) => void) {
    //创建socket连接
    const socket = new WebSocket(url);
    this.socket = socket;
    //当socket连接上时触发
    socket.addEventListener("open", (e) => {
    });
    //当服务器发送消息时触发
    socket.addEventListener("message", (e) => {
      // console.log("Message from server: ", e.data);
      this.data = e.data;
      if (typeof this.data === "string") {
        handleReceiveData(this.data);
      } else {
        console.warn("The received data is not string");
      }
    })
  }
  sendData(data: string | ArrayBuffer | Blob | ArrayBufferView): boolean {
    try {
      //向服务器发送数
      this.socket.send(data);
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  close(): void {
    this.socket.close();
    console.log("WebSocket has closed.");
  }
}