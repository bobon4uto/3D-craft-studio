"use strict";
// Assuming you have a class for your component
var Navigation = /** @class */ (function () {
    function Navigation() {
        this.handleClick = function (e) {
            e.preventDefault();
            // Remove active class from all links and sections
            document
                .querySelectorAll(".nav-link")
                .forEach(function (el) { return el.classList.remove("active"); });
            document
                .querySelectorAll(".section")
                .forEach(function (el) { return el.classList.remove("active"); });
            // Add active class to the current link
            var target = e.currentTarget; // Use currentTarget to refer to the clicked link
            target.classList.add("active");
            // Show the target section
            var targetId = target.getAttribute("data-target");
            if (targetId) {
                var targetSection = document.getElementById(targetId);
                targetSection === null || targetSection === void 0 ? void 0 : targetSection.classList.add("active");
            }
        };
        this.init();
    }
    Navigation.prototype.init = function () {
        var _this = this;
        // Select all navigation links
        var links = document.querySelectorAll(".nav-link");
        links.forEach(function (link) {
            link.addEventListener("click", _this.handleClick);
        });
    };
    return Navigation;
}());
// Initialize the navigation
new Navigation();
