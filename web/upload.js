// Переключение между секциями
document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        // Убираем активный класс у всех ссылок и секций
        document
            .querySelectorAll(".nav-link")
            .forEach((el) => el.classList.remove("active"));
        document
            .querySelectorAll(".section")
            .forEach((el) => el.classList.remove("active"));
        // Добавляем активный класс текущей ссылке
        this.classList.add("active");
        // Показываем целевую секцию
        const targetId = this.getAttribute("data-target");
        document.getElementById(targetId).classList.add("active");
    });
});
// Загрузка файла
const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("fileInput");
const browseBtn = document.getElementById("browseBtn");
browseBtn.addEventListener("click", () => {
    fileInput.click();
});
//fileInput.addEventListener("change", () => {
//  if (fileInput.files.length) {
//    handleFile(fileInput.files[0]);
//  }
//});
dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "#4e54c8";
    dropZone.style.backgroundColor = "rgba(78, 84, 200, 0.05)";
});
dropZone.addEventListener("dragleave", () => {
    dropZone.style.borderColor = "#ddd";
    dropZone.style.backgroundColor = "";
});
dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
        handleFile(e.dataTransfer.files[0]);
    }
    dropZone.style.borderColor = "#ddd";
    dropZone.style.backgroundColor = "";
});
function handleFile(file) {
    const validTypes = [
        "application/sla",
        "model/stl",
        "application/octet-stream",
        "application/vnd.ms-pki.stl",
    ];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (validTypes.includes(file.type) ||
        ["stl", "obj", "3mf"].includes(fileExtension)) {
        alert(`Файл "${file.name}" успешно загружен!`);
    }
    else {
        alert("Пожалуйста, загрузите файл в формате STL, OBJ или 3MF");
    }
}
