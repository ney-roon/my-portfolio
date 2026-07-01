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

// Handle image upload and add to gallery
document.getElementById('addImage').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file); // temporary preview
    img.alt = "user-uploaded";           // fallback alt text
    img.classList.add('responsive-image');

    // Append to art gallery track
    document.getElementById('artTrack').appendChild(img);

    // Optional: reset file input so you can upload again
    event.target.value = "";
  }
});
// Add uploaded image to art gallery
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
document.addEventListener("contextmenu", (e) => e.preventDefault());
document.querySelectorAll("img").forEach(img => {
  img.addEventListener("dragstart", (e) => e.preventDefault());
});
// Initialize Supabase
const { createClient } = supabase;

const supabaseUrl = "https://ysqcsanlubthizcmuilo.supabase.co";   // from API settings
const supabaseKey = "sb_publishable_2cNsfN_8rfOT9RmO__fqrg_N8Yg5UjW"; // your anon key
const supabaseClient = createClient(supabaseUrl, supabaseKey);

let imageElements = [];
let currentIndex = 0;

// --- Upload image to Supabase ---
document.getElementById('addImage').addEventListener('change', async function(event) {
  const file = event.target.files[0];
  if (file) {
    // Upload to Supabase Storage bucket "gallery"
    const { error } = await supabaseClient.storage
      .from('gallery')
      .upload(`uploads/${file.name}`, file, { upsert: true });

    if (error) {
      console.error("Upload error:", error);
      return;
    }

    // Refresh gallery after upload
    loadGallery();
    event.target.value = "";
  }
});

// --- Load images from Supabase on page refresh ---
async function loadGallery() {
  const { data, error } = await supabaseClient.storage.from('gallery').list('uploads/');
  if (error) {
    console.error("List error:", error);
    return;
  }

  const artTrack = document.getElementById('artTrack');
  artTrack.innerHTML = ""; // clear old images
  imageElements = [];

  for (const file of data) {
    const { data: publicUrlData } = supabaseClient.storage
      .from('gallery')
      .getPublicUrl(`uploads/${file.name}`);

    const img = document.createElement('img');
    img.src = publicUrlData.publicUrl;
    img.classList.add('responsive-image');

    artTrack.appendChild(img);
    imageElements.push(img);

    // Double‑click opens popup
    img.addEventListener("dblclick", () => {
      currentIndex = imageElements.indexOf(img);
      openPopup(img);
    });
  }
}

// --- Popup modal controls ---
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

// --- Buttons & keyboard controls ---
document.getElementById("nextBtn").addEventListener("click", nextImage);
document.getElementById("prevBtn").addEventListener("click", prevImage);
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
  if (e.key === "Escape") closePopup();
});

// Load gallery on startup
document.addEventListener("DOMContentLoaded", loadGallery);
