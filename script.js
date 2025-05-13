let currentIndex=0;
let imageElements=[];
document.addEventListener("DOMContentLoaded", function () {
    // Ensure the popup effect works
    
    imageElements=Array.from(document.querySelectorAll(".placeholder img"));

    document.querySelectorAll(".placeholder").forEach((div, index) => {
            div.addEventListener("dblclick", function () {
                currentIndex= index;
                console.log("Double-click detected on:", imageElements[currentIndex].src);
                openPopup(imageElements[currentIndex]);
            });
        });
        document.getElementById("nextBtn").addEventListener("click", nextImage);
        document.getElementById("prevBtn").addEventListener("click", prevImage);
    });

function openPopup(imageElement) {
    const modal = document.getElementById('popupModal');
    const modalImg = document.getElementById('popupImage');

    modal.style.display = 'block';
    modalImg.src = imageElement.src;
    
    modalImg.style.width = "100";
    modalImg.style.height= "auto";
    modalImg.style.objectFit= "contain; "
}

function closePopup() {
    document.getElementById('popupModal').style.display = 'none';
}
function nextImage() {
    if (currentIndex < imageElements.length - 1) {
        currentIndex++;
        openPopup(imageElements[currentIndex]);
    } else {
        console.log("Reached last image.");
    }
}

function prevImage() {
    if (currentIndex > 0) {
        currentIndex--;
        openPopup(imageElements[currentIndex]);
    } else {
        console.log("Reached first image.");
    }
}