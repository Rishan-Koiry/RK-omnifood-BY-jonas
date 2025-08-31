/////////////////////////////////////////////////
// Set current year

const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();

yearEl.textContent = currentYear;

/////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

////////////////////////////////////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");
    // Scroll back to top
    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({
        behavior: "smooth",
      });
    }

    // Close the mobile navigation
    if (link.classList.contains("main-nav-link")) {
      headerEl.classList.toggle("nav-open");
    }
  });
});

////////////////////////////////////////////////
// Sticky header

window.addEventListener("scroll", function () {
  if (window.scrollY >= 720) {
    this.document.body.classList.add("sticky");
  } else {
    this.document.body.classList.remove("sticky");
  }
});

////////////////////////////////////////////////
// Enhanced FAQ Accordion functionality

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Enhanced FAQ Accordion functionality
  initFAQAccordion();
});

// Enhanced FAQ Accordion Function
function initFAQAccordion() {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const item = header.parentElement;
      const content = item.querySelector(".accordion-content");
      const isOpen = item.classList.contains("open");

      // Close all other accordion items
      accordionHeaders.forEach((otherHeader) => {
        const otherItem = otherHeader.parentElement;
        const otherContent = otherItem.querySelector(".accordion-content");

        if (otherItem !== item) {
          otherItem.classList.remove("open");
          otherContent.style.maxHeight = "0px";
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove("open");
        content.style.maxHeight = "0px";
      } else {
        item.classList.add("open");
        // Set max-height to scrollHeight for smooth animation
        content.style.maxHeight = content.scrollHeight + "px";

        // Scroll into view with some offset
        setTimeout(() => {
          const headerHeight =
            document.querySelector(".header").offsetHeight || 0;
          const offset = headerHeight + 20;
          const elementPosition =
            item.getBoundingClientRect().top + window.pageYOffset - offset;

          window.scrollTo({
            top: elementPosition,
            behavior: "smooth",
          });
        }, 200);
      }
    });
  });

  // Add keyboard support
  accordionHeaders.forEach((header) => {
    header.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        header.click();
      }
    });

    // Make headers focusable
    header.setAttribute("tabindex", "0");
    header.setAttribute("role", "button");
    header.setAttribute("aria-expanded", "false");
  });

  // Update aria-expanded when items open/close
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        const item = mutation.target;
        const header = item.querySelector(".accordion-header");
        const isOpen = item.classList.contains("open");

        if (header) {
          header.setAttribute("aria-expanded", isOpen.toString());
        }
      }
    });
  });

  // Observe all accordion items for class changes
  document.querySelectorAll(".accordion-item").forEach((item) => {
    observer.observe(item, { attributes: true, attributeFilter: ["class"] });
  });
}

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
