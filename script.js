let currentIndex = 0;
let imageElements = [];

document.addEventListener("DOMContentLoaded", function () {
    // Collect all gallery images
    imageElements = Array.from(document.querySelectorAll(".placeholder img"));

    // Double-click opens popup
    document.querySelectorAll(".placeholder").forEach((div, index) => {
        div.addEventListener("dblclick", function () {
            currentIndex = index;
            openPopup(imageElements[currentIndex]);
        });
    });

    // Buttons
    document.getElementById("nextBtn").addEventListener("click", nextImage);
    document.getElementById("prevBtn").addEventListener("click", prevImage);

    // Keyboard controls
    document.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "Escape") closePopup();
    });
});

function openPopup(imageElement) {
    const modal = document.getElementById('popupModal');
    const modalImg = document.getElementById('popupImage');

    modal.style.display = 'block';
    modalImg.src = imageElement.src;

    // Fixed sizing
    modalImg.style.width = "100%";
    modalImg.style.height = "auto";
    modalImg.style.objectFit = "contain";
}

function closePopup() {
    document.getElementById('popupModal').style.display = 'none';
}

function nextImage() {
    if (currentIndex < imageElements.length - 1) {
        currentIndex++;
        openPopup(imageElements[currentIndex]);
    }
}

function prevImage() {
    if (currentIndex > 0) {
        currentIndex--;
        openPopup(imageElements[currentIndex]);
    }
}const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});
backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// --- Gallery Widgets Control ---
const widgetButtons = document.querySelectorAll(".widget-btn");
const artGrid = document.querySelector(".art-grid");
const images = document.querySelectorAll(".art-grid img");

widgetButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");

    // Show the grid when a widget is clicked
    artGrid.style.display = "grid";

    // Filter images by category
    images.forEach(img => {
      if (filter === "all" || img.alt.toLowerCase().includes(filter)) {
        img.parentElement.style.display = "block"; // show placeholder
      } else {
        img.parentElement.style.display = "none";  // hide placeholder
      }
    });
  });
});

