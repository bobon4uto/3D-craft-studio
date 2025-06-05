const ws = new WebSocket("ws://217.71.129.139:5459");
const start = performance.now();
const num: number = 10000;
let cur: number = 0;

ws.addEventListener("open", () => {
  console.log(start.valueOf());
  console.log(performance.now().valueOf());
  console.log("Connected to the server");
  for (let i = 0; i < 10; i++) {
    ws.send(
      JSON.stringify({ type: "reg", mess: { login: "!", password: "!" } }),
    );
  }
});

ws.addEventListener("message", (event: MessageEvent) => {
  if (cur > num) {
    return;
  }
  cur++;
  console.log(`Message from server: ${event.data}`);
  ws.send(JSON.stringify({ type: "reg", mess: { login: "!", password: "!" } }));

  console.log(performance.now().valueOf() - start.valueOf());
});
