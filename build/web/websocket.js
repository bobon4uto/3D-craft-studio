"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ws = new WebSocket("ws://localhost:8080");
var enterbtn = document.getElementById("enter-btn");
var exitbtn = document.getElementById("exit-btn");
var regbtn = document.getElementById("regbtn");
var dashboard = document.getElementById("dashboard");
var dashboardi = document.getElementById("emptydashboard");
var useractions = document.getElementById("userActions");
var userprofile = document.getElementById("userProfile");
var userEmail = document.getElementById("userEmail");
var modallogin = document.getElementById("modal-login");
var ilogin = document.getElementById("ilogin");
var ipasswd = document.getElementById("ipasswd");
var btnlogg = document.getElementById("btn-logg");
var last_data = localStorage.getItem("userData");
var current_user = {
    id: 0,
    online: false,
    username: "0",
};
if (last_data) {
    current_user = JSON.parse(last_data);
}
apply_user();
localStorage.setItem("userData", JSON.stringify(current_user));
function setall() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            userprofile.style.display = "flex";
            useractions.style.display = "none";
            userEmail.textContent = current_user.username;
            return [2 /*return*/];
        });
    });
}
function resetall() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            userprofile.style.display = "none";
            useractions.style.display = "flex";
            return [2 /*return*/];
        });
    });
}
function apply_user() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(current_user.id !== 0)) return [3 /*break*/, 2];
                    return [4 /*yield*/, setall()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    resetall();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
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
        localStorage.setItem("userData", JSON.stringify(current_user));
    }
    if (current_user.id !== 0) {
        apply_user();
        userprofile.style.display = "flex";
        useractions.style.display = "none";
        userEmail.textContent = current_user.username;
    }
    else {
        apply_user();
        userprofile.style.display = "none";
        useractions.style.display = "flex";
    }
});
ws.addEventListener("close", function () {
    console.log("Disconnected from the server");
});
var reg = false;
function on_modalogin(event) {
    var user = {
        login: (ilogin === null || ilogin === void 0 ? void 0 : ilogin.value) || "!",
        password: (ipasswd === null || ipasswd === void 0 ? void 0 : ipasswd.value) || "!",
    };
    //userprofile.style.display = "flex";
    //useractions.style.display = "none";
    modallogin.style.display = "none";
    if (reg) {
        reg = false;
        ws.send(JSON.stringify({ type: "reg", mess: user }));
    }
    else {
        wsend(user);
    }
}
btnlogg.addEventListener("click", on_modalogin);
function on_click(event) {
    modallogin.style.display = "flex";
}
enterbtn.addEventListener("click", on_click);
function on_reg(event) {
    modallogin.style.display = "flex";
    reg = true;
}
regbtn.addEventListener("click", on_reg);
function on_exit(event) {
    var user = {
        login: "0",
        password: "0",
    };
    current_user.id = 0;
    localStorage.setItem("userData", JSON.stringify(current_user));
    userprofile.style.display = "none";
    useractions.style.display = "flex";
    wsend(user);
}
exitbtn.addEventListener("click", on_exit);
