const ws = new WebSocket("ws://localhost:8080");

const enterbtn: HTMLElement = document.getElementById("enter-btn")!;
const exitbtn: HTMLElement = document.getElementById("exit-btn")!;
const useractions: HTMLElement = document.getElementById("userActions")!;
const userprofile: HTMLElement = document.getElementById("userProfile")!;
const modallogin: HTMLElement = document.getElementById("modal-login")!;
const ilogin: HTMLInputElement = document.getElementById(
  "ilogin",
)! as HTMLInputElement;
const ipasswd: HTMLInputElement = document.getElementById(
  "ipasswd",
)! as HTMLInputElement;
const btnlogg: HTMLButtonElement = document.getElementById(
  "btn-logg",
)! as HTMLButtonElement;

let current_user: User3D = {
  id: 0,
  online: false,
  username: "0",
};

function wsend(mess: any) {
  const m: Mess3D = {
    type: typeof mess,
    mess: mess,
  };
  console.log(JSON.stringify(m));
  ws.send(JSON.stringify(m));
}

ws.addEventListener("open", () => {
  console.log("Connected to the server");
  wsend("Hello Server!");
});

ws.addEventListener("message", (event: MessageEvent) => {
  console.log(`Message from server: ${event.data}`);
  const mess: Mess3D = JSON.parse(event.data);
  if (mess.type === typeof current_user) {
    current_user = mess.mess;
  }

  if (current_user.id === 0) {
    userprofile.style.display = "flex";
    useractions.style.display = "none";
  } else {
    userprofile.style.display = "none";
    useractions.style.display = "flex";
  }
});

ws.addEventListener("close", () => {
  console.log("Disconnected from the server");
});
function on_modalogin(event: MouseEvent): any {
  let user: UserLogin = {
    login: ilogin?.value || "!",
    password: ipasswd?.value || "!",
  };
  userprofile.style.display = "flex";
  useractions.style.display = "none";
  modallogin.style.display = "none";
  wsend(user);
}
btnlogg.addEventListener("click", on_modalogin);
function on_click(event: MouseEvent): any {
  modallogin.style.display = "flex";
}
enterbtn.addEventListener("click", on_click);
function on_exit(event: MouseEvent): any {
  let user: UserLogin = {
    login: "0",
    password: "0",
  };
  current_user.id = 0;
  userprofile.style.display = "none";
  useractions.style.display = "flex";

  wsend(user);
}
exitbtn.addEventListener("click", on_exit);
