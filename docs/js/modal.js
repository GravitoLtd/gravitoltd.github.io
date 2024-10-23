// Get modal element
var modal = document.getElementById("imageModal");

// Get the image and the modal image elements
var modalImg = document.getElementById("modalImg");
var captionText = document.getElementById("caption");

// Get all images with the class 'clickable-img'
var images = document.querySelectorAll(".clickable-img");

// Attach click event to each image
images.forEach(function (img) {
  img.onclick = function () {
    modal.style.display = "flex";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
  };
});

// Get the close button
var closeBtn = document.getElementsByClassName("close")[0];

// Close the modal when the close button is clicked
closeBtn.onclick = function () {
  modal.style.display = "none";
};
