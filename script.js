let currentIndex = 0;
let imageElements = [];

// --- Gallery popup controls ---
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
}

// --- Back to Top button ---
const backToTop = document.getElementById("backToTop");
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
const backBtn = document.getElementById("backBtn");
const widgetPanel = document.querySelector(".gallery-widgets");

widgetButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");

    // Hide widgets, show grid + back button
    widgetPanel.style.display = "none"; 
    artGrid.style.display = "grid";
    backBtn.style.display = "block";

    // Filter images by category
    images.forEach(img => {
      if (filter === "all" || img.alt.toLowerCase().includes(filter)) {
        img.parentElement.style.display = "block";
      } else {
        img.parentElement.style.display = "none";
      }
    });
  });
});

// Back button returns to widget view
backBtn.addEventListener("click", () => {
  artGrid.style.display = "none";
  backBtn.style.display = "none";
  widgetPanel.style.display = "flex";
});

// --- Handle image upload (local preview only) ---
document.getElementById('addImage').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file); // temporary preview
    img.alt = "user-uploaded";
    img.classList.add('responsive-image');

    // Append to art gallery track
    document.getElementById('artTrack').appendChild(img);

    // Reset input so you can upload again
    event.target.value = "";
  }
});

// --- Contact form (Google Apps Script endpoint) ---
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = {
    name: e.target.name.value,
    email: e.target.email.value,
    message: e.target.message.value
  };

  fetch("YOUR_GOOGLE_WEB_APP_URL", {
    method: "POST",
    body: JSON.stringify(formData)
  })
  .then(response => alert("Message sent successfully!"))
  .catch(error => alert("Error sending message."));
  
  e.target.reset();
});

// --- Disable right-click and drag on images ---
document.addEventListener("contextmenu", (e) => e.preventDefault());
document.querySelectorAll("img").forEach(img => {
  img.addEventListener("dragstart", (e) => e.preventDefault());
});

// --- Video popup greeting ---
document.addEventListener("DOMContentLoaded", () => {
  const videoPopup = document.getElementById("videoPopup");
  const introVideo = document.getElementById("introVideo");

  // Show popup when page loads
  videoPopup.style.display = "flex";

  // Hide popup when video ends
  introVideo.addEventListener("ended", () => {
    videoPopup.style.display = "none";
  });
});
