//bistrot js

// Get the modal and the images
const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modal-content");
const images = document.querySelectorAll(".photo-grid_wrapper img");
const prevButton = document.querySelector(".prevButton");
const nextButton = document.querySelector(".nextButton");

let currentImageIndex = 0;

// Function to open the modal
function openModal(imgSrc, index) {
  modal.style.display = "flex";
  modalImg.src = imgSrc;
  currentImageIndex = index;
  updateNavigation();
}

// Function to close the modal
function closeModal() {
  modal.style.display = "none";
}

// Function to update navigation buttons
function updateNavigation() {
  prevButton.style.display = currentImageIndex === 0 ? "none" : "block";
  nextButton.style.display =
    currentImageIndex === images.length - 1 ? "none" : "block";
}

// Function to show previous image
function showPreviousImage() {
  if (currentImageIndex > 0) {
    currentImageIndex--;
    modalImg.src = images[currentImageIndex].getAttribute("src");
    updateNavigation();
  }
}

// Function to show next image
function showNextImage() {
  if (currentImageIndex < images.length - 1) {
    currentImageIndex++;
    modalImg.src = images[currentImageIndex].getAttribute("src");
    updateNavigation();
  }
}

// Attach click event listeners to each image
images.forEach((image, index) => {
  image.addEventListener("click", () => {
    const imgSrc = image.getAttribute("src");
    openModal(imgSrc, index);
  });
});

// Attach click event listener to the close button
const closeBtn = document.querySelector(".closeBtn");
closeBtn.addEventListener("click", closeModal);

// Attach click event listener to the previous button
prevButton.addEventListener("click", showPreviousImage);

// Attach click event listener to the next button
nextButton.addEventListener("click", showNextImage);

//*js for dots function

const dots = document.querySelectorAll('.dot');
const sections = document.querySelectorAll('section');


dots.forEach(dot => {
    dot.addEventListener('click', ()=> {
        const sectionIndex = dot.getAttribute('data-section');
        
        sections[sectionIndex].scrollIntoView({behavior: 'smooth'});
    })
})

window.addEventListener('scroll', ()=> {
    const sectionInView = Array.from(sections).findIndex(section => {
    
        const rect = section.getBoundingClientRect();
        return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
        
    });
   


    dots.forEach((dot, index)=> {
        
        if (index === sectionInView) {
            if (sections[sectionInView].classList.contains('bis-contact')) {
                dot.classList.add('active'); // Add the "active" class

                dot.classList.add('white'); // Add the "white" class
            } else {
                dot.classList.add('active'); // Add the "active" class
                dot.classList.remove('white'); // Remove the "white" class
            }
        } else {
            dot.classList.remove('active'); // Remove the "active" class
            dot.classList.add('white'); // Add the "white" class
        }
    });


});


















