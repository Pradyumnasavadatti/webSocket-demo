const ws = new WebSocket("ws://localhost:18000");

document.getElementById("reset").addEventListener("click", () => {
  document.getElementById("ta").value = "";
});

document.getElementById("send").addEventListener("click", () => {
  ws.send(document.getElementById("ta").value);
});

ws.onmessage = (msg) => {
  const { data } = msg;
  const ele = document.createElement("div");
  ele.setAttribute("id", "msg");
  ele.innerHTML = data;
  document.getElementById("div2").appendChild(ele);
};
