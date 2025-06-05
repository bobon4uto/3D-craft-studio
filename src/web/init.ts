const scripts = ["switch.js", "upload.js", "websocket.js"];

function loadScripts(scripts: Array<string>) {
  scripts.forEach((script: string) => {
    const scriptElement: HTMLScriptElement = document.createElement("script");

    scriptElement.src = "./build/web/" + script;
    scriptElement.async = true; // Load scripts wheneva
    document.body.appendChild(scriptElement);
  });
}

loadScripts(scripts);
