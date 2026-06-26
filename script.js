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
}
