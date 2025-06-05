"use strict";
// Загрузка файла
var dropZone = document.getElementById("dropZone");
var fileInput = document.getElementById("fileInput");
var browseBtn = document.getElementById("browseBtn");
browseBtn === null || browseBtn === void 0 ? void 0 : browseBtn.addEventListener("click", function () {
    fileInput === null || fileInput === void 0 ? void 0 : fileInput.click();
});
dropZone === null || dropZone === void 0 ? void 0 : dropZone.addEventListener("dragover", function (e) {
    e.preventDefault();
    dropZone.style.borderColor = "#4e54c8";
    dropZone.style.backgroundColor = "rgba(78, 84, 200, 0.05)";
});
dropZone === null || dropZone === void 0 ? void 0 : dropZone.addEventListener("dragleave", function () {
    dropZone.style.borderColor = "#ddd";
    dropZone.style.backgroundColor = "";
});
dropZone === null || dropZone === void 0 ? void 0 : dropZone.addEventListener("drop", function (e) {
    var _a;
    e.preventDefault();
    if ((_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.files.length) {
        handleFile(e.dataTransfer.files[0]);
    }
    dropZone.style.borderColor = "#ddd";
    dropZone.style.backgroundColor = "";
});
function handleFile(file) {
    var _a;
    var validTypes = [
        "application/sla",
        "model/stl",
        "application/octet-stream",
        "application/vnd.ms-pki.stl",
    ];
    var fileExtension = (_a = file.name.split(".").pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (validTypes.includes(file.type) ||
        ["stl", "obj", "3mf"].includes(fileExtension || "")) {
        alert("\u0424\u0430\u0439\u043B \"".concat(file.name, "\" \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D!"));
    }
    else {
        alert("Пожалуйста, загрузите файл в формате STL, OBJ или 3MF");
    }
}
