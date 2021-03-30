export default class BaseSocket {
  private socket: WebSocket;
  private data: any;
  constructor(url: string, handleReceiveData: (data: string) => void) {
    const socket = new WebSocket(url);
    this.socket = socket;
    socket.addEventListener("open", (e) => {
    });
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