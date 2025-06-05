"use strict";
var ws = new WebSocket("ws://localhost:8080");
var enterbtn = document.getElementById("enter-btn");
var exitbtn = document.getElementById("exit-btn");
var useractions = document.getElementById("userActions");
var userprofile = document.getElementById("userProfile");
var modallogin = document.getElementById("modal-login");
var ilogin = document.getElementById("ilogin");
var ipasswd = document.getElementById("ipasswd");
var btnlogg = document.getElementById("btn-logg");
var current_user = {
    id: 0,
    online: false,
    username: "0",
};
function wsend(mess) {
    var m = {
        type: typeof mess,
        mess: mess,
    };
    console.log(JSON.stringify(m));
    ws.send(JSON.stringify(m));
}
ws.addEventListener("open", function () {
    console.log("Connected to the server");
    wsend("Hello Server!");
});
ws.addEventListener("message", function (event) {
    console.log("Message from server: ".concat(event.data));
    var mess = JSON.parse(event.data);
    if (mess.type === typeof current_user) {
        current_user = mess.mess;
    }
    if (current_user.id === 0) {
        userprofile.style.display = "flex";
        useractions.style.display = "none";
    }
    else {
        userprofile.style.display = "none";
        useractions.style.display = "flex";
    }
});
ws.addEventListener("close", function () {
    console.log("Disconnected from the server");
});
function on_modalogin(event) {
    var user = {
        login: (ilogin === null || ilogin === void 0 ? void 0 : ilogin.value) || "!",
        password: (ipasswd === null || ipasswd === void 0 ? void 0 : ipasswd.value) || "!",
    };
    userprofile.style.display = "flex";
    useractions.style.display = "none";
    modallogin.style.display = "none";
    wsend(user);
}
btnlogg.addEventListener("click", on_modalogin);
function on_click(event) {
    modallogin.style.display = "flex";
}
enterbtn.addEventListener("click", on_click);
function on_exit(event) {
    var user = {
        login: "0",
        password: "0",
    };
    current_user.id = 0;
    userprofile.style.display = "none";
    useractions.style.display = "flex";
    wsend(user);
}
exitbtn.addEventListener("click", on_exit);
