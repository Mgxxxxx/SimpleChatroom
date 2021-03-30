<template>
  <div class="card">
    <div class="card-header">
      <div class="h4">Chat</div>
    </div>
    <div class="card-body">
      <div class="container-fluid overflow-auto pt-2">
        <div
          class="row pb-2"
          v-for="(msg, i) in msgQueue"
          :key="i"
          :ref="i === msgQueue.length - 1 ? 'chatContainer' : undefined"
        >
          <span class="ml-2">{{ msg.userName }}: </span>
          <span>{{ msg.msg }}</span>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="form-group clearfix">
        <textarea
          class="form-control"
          :rows="5"
          ref="input"
          placeholder="Input something..."
          @keydown.enter.prevent="sendMsg()"
        ></textarea>
        <div class="btn btn-primary btn-sm float-right mt-1" @click="sendMsg()">
          发送
        </div>
        <div
          class="btn btn-danger btn-sm float-right mt-1 mr-3"
          @click="closeWebSocket"
        >
          退出聊天室
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref } from "vue";
import Socket from "../websocket";
export default defineComponent({
  name: "demo",
  setup() {
    class Msg {
      constructor(public msg: string, public userName: string) {}
    }
    const msgQueue = ref([] as Msg[]);
    const input = ref(null);
    const chatContainer = ref(null);
    let name = "";

    const pushMsg = (msg: string, userName: string): void => {
      const newMsg = new Msg(msg, userName);
      msgQueue.value.push(newMsg);
      nextTick(() => {
        chatContainer.value !== null &&
          ((chatContainer.value as unknown) as HTMLElement).scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
      });
    };
    const sendMsg = () => {
      while (name === "") {
        name = prompt("Input your name") as string;
      }
      const content = ((input.value as unknown) as HTMLInputElement).value;
      if (content === "") {
        alert("Please input something");
        return false;
      }
      pushMsg(content, "me");
      ((input.value as unknown) as HTMLInputElement).value = "";
      ws.sendData(name + ": " + content);
    };
    const closeWebSocket = (): void => {
      ws.close();
    };

    onMounted(() => {
      ((input.value as unknown) as HTMLInputElement).focus();
      // name.value = prompt("Input your name:") as string;
    });

    const ws = new Socket("ws://localhost:12656", (data: string) => {
      const [user, msg] = data.split(":");
      // console.log(user, msg);
      pushMsg(msg, user);
    });

    return {
      msgQueue,
      input,
      chatContainer,
      sendMsg,
      closeWebSocket,
    };
  },
});
</script>

<style scoped lang="scss">
.container-fluid {
  border: 1px solid #ccc;
  border-radius: 5px;
  min-height: calc(430px - 1.4rem);
  max-height: calc(430px - 1.4rem);
}
</style>
