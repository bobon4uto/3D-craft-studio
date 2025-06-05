"use strict";
var scripts = ["switch.js", "upload.js", "websocket.js"];
function loadScripts(scripts) {
    scripts.forEach(function (script) {
        var scriptElement = document.createElement("script");
        scriptElement.src = "./build/web/" + script;
        scriptElement.async = true; // Load scripts wheneva
        document.body.appendChild(scriptElement);
    });
}
loadScripts(scripts);
