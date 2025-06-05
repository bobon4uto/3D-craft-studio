// Assuming you have a class for your component
class Navigation {
  constructor() {
    this.init();
  }

  init() {
    // Select all navigation links
    const links = document.querySelectorAll<HTMLElement>(".nav-link");

    links.forEach((link) => {
      link.addEventListener("click", this.handleClick);
    });
  }

  handleClick = (e: MouseEvent) => {
    e.preventDefault();

    // Remove active class from all links and sections
    document
      .querySelectorAll<HTMLElement>(".nav-link")
      .forEach((el) => el.classList.remove("active"));
    document
      .querySelectorAll<HTMLElement>(".section")
      .forEach((el) => el.classList.remove("active"));

    // Add active class to the current link
    const target = e.currentTarget as HTMLElement; // Use currentTarget to refer to the clicked link
    target.classList.add("active");

    // Show the target section
    const targetId = target.getAttribute("data-target");
    if (targetId) {
      const targetSection = document.getElementById(targetId);
      targetSection?.classList.add("active");
    }
  };
}

// Initialize the navigation
new Navigation();
