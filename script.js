let currentIndex = 0;
let imageElements = [];

// --- Gallery popup controls ---
document.addEventListener("DOMContentLoaded", function () {
    // Collect all gallery images
    imageElements = Array.from(document.querySelectorAll(".art-scroll-track img"));

    // Double-click opens popup
    imageElements.forEach((img, index) => {
        img.addEventListener("dblclick", function () {
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
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});
backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    document.querySelector('.art-scroll-track').appendChild(img);

    // Reset input so you can upload again
    event.target.value = "";
  }
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

// --- Firebase setup ---
const firebaseConfig = {
  apiKey: "AIzaSyAgaGbqIhaJrY_il83Cd0qWAcSQ4-w-59U",
  authDomain: "my-portfolio-fd7a4.firebaseapp.com",
  projectId: "my-portfolio-fd7a4",
  storageBucket: "my-portfolio-fd7a4.appspot.com",
  messagingSenderId: "1075228854748",
  appId: "1:1075228854748:web:cad3c816749243bc7fa719",
  measurementId: "G-84G30WZ1FK"
};

// ✅ Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
const app = initializeApp(firebaseConfig);

import { getFirestore, collection, getDocs, doc, getDoc } 
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const db = getFirestore(app);

// --- Load community portfolios ---
async function loadCommunityPortfolios() {
  const querySnapshot = await getDocs(collection(db, "users"));
  const list = document.getElementById("portfolioList");
  const count = document.getElementById("portfolioCount");
  list.innerHTML = "";
  let total = 0;

  for (const userDoc of querySnapshot.docs) {
    const portfolioRef = doc(db, "users", userDoc.id, "portfolio", "main");
    const snap = await getDoc(portfolioRef);
    if (snap.exists()) {
      total++;
      const data = snap.data();
      const card = document.createElement("div");
      card.className = "portfolioCard";
      card.innerHTML = `
        <h3>${data.title || "Untitled Portfolio"}</h3>
        <p>${data.bio || ""}</p>
        <a href="portfolio.html?uid=${userDoc.id}" target="_blank">View Portfolio</a>
      `;
      list.appendChild(card);
    }
  }
  count.innerText = `🎉 ${total} portfolios created so far!`;
}

// Run when page loads
window.addEventListener("DOMContentLoaded", loadCommunityPortfolios);
document.addEventListener("scroll", () => {
  document.querySelectorAll("section").forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      sec.classList.add("visible");
    }
  });
});
