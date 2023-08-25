const menuBurger = document.querySelector('.burger');
const menuNav = document.querySelector('.overlay');
const btn = document.querySelector('.btn-header');
const logo = document.querySelector('.logo');

menuBurger.addEventListener('click', ()=>{

    logo.style.textAlign = 'center';
    btn.style.display = 'none';
    menuNav.classList.toggle('hide');
    menuBurger.classList('cross');
})

//*header when scroll

const header = document.querySelector('header');
const btnHeader = document.querySelector('.btn.btn-header')
const burgerXlines = document.querySelector('.line')


//background and color of certain elements changes when scroll
window.addEventListener('scroll',() => {
    if (window.scrollY > 0){
        header.classList.add('fixed');
    }else {
        header.classList.remove('fixed');
    }
})

let prevScroll = window.scrollY;
window.onscroll = function() {
  const currentScroll = window.scrollY;
  //header disappears after 300px
  if (prevScroll > currentScroll) {
    header.style.top = "0";
  } else {
     header.style.top = "-7.2rem";
  }
  //header reappears when scroll up
  prevScroll = currentScroll;
}



//*carousel for cards on room.html
const carouselContainer = document.querySelectorAll('.carousel-wrap');
carouselContainer.forEach((container)=> {


console.log(carouselContainer);
const track = container.querySelector('.carousel__track');
const slides = Array.from(track.children)

const nextButton = container.querySelector('.carousel__button--right');
const prevButton = container.querySelector('.carousel__button--left');
const dotsNav = container.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;
// console.log(slideWidth);

//arrange the slides next to one another
// slides[0].style.left = slideWidth * 0 + 'px';
// slides[1].style.left = slideWidth * 1 + 'px';
// slides[2].style.left = slideWidth * 2 + 'px';
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide)=> {
    track.style.transform = 'translateX( -' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if(targetIndex === 0){
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden')
    }else if(targetIndex === slides.length - 1){
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else{
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}
//when i click left, move slides to the left
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
   const prevIndex = slides.findIndex(slide => slide === prevSlide);


    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);


})

//when i click right, move sides to the right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
   const nextIndex = slides.findIndex(slide => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);


})

//when i click the nav indicator, move to that slide
    
dotsNav.addEventListener('click', e => {
    //what indicator was click on
    const targetDot = e.target.closest('button');

    
    if(!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot  => dot === targetDot);
    const targetSlide = slides[targetIndex];   
    
    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);

    hideShowArrows(slides, prevButton, nextButton, targetIndex);
})

})   


//*links for the image gallery

const galleryLinks = document.querySelectorAll('.gallery-link');
const galleries = document.querySelectorAll('.image-gallery');

galleryLinks.forEach(link => {
    link.addEventListener('click', (e)=>{
        e.preventDefault();

        //Deactivate all links and hide all galleries
        galleryLinks.forEach(link => link.classList.remove('active'));
        galleries.forEach(gallery => gallery.classList.remove('active'));

        //Activate the clicked link and show the corresponding gallery
        link.classList.add('active');
        
        const target = link.getAttribute('data-target');
        document.getElementById(`${target}-gallery`).classList.add('active');
    })
})

//*overlay carousel

galleries.forEach((gallery, galleryIndex)=>{
    //div wrapper that covers the images
    const imageWrappers = gallery.querySelectorAll('.img-wrapper');
    //pop up modal with semi black background
    const modal = gallery.querySelector('.modal');

    //image within
    const modalImages = modal.querySelector('.modal-content');

    //close button
    const closeBtn = modal.querySelector('.closeBtn');
    //next button
    const nextBtn = modal.querySelector('.nextButton');
    //previous button
    const prevBtn = modal.querySelector('.prevButton');

    // Attach click event listeners to image wrappers
    imageWrappers.forEach((wrapper,index)=> {
        wrapper.addEventListener('click', ()=>{
            openModal(galleryIndex, index);
        })
    })
    
    // Other event listeners and functions remain the same with adjustments to modal handling
    closeBtn.addEventListener('click', () => {
        closeModal();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + imageWrappers.length) % imageWrappers.length;
        updateModalImage();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % imageWrappers.length;
        updateModalImage();
    });

    function openModal(galleryIndex, imageIndex) {
        currentIndex = imageIndex;
        updateModalImage();
        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function updateModalImage() {
        const selectedGallery = galleries[galleryIndex];
        const selectedImageWrapper = selectedGallery.querySelectorAll('.img-wrapper')[currentIndex];
        modalImages.src = selectedImageWrapper.querySelector('img').src;
    }

    // Close modal when clicking outside the image
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

})


// // Attach click event listeners to image wrappers

// imageWrappers.forEach((wrapper, index) => {
//     wrapper.addEventListener('click', () => {
//         imgModal(imageElements[index].src, index);
//     });
// });

// //creating the modal

// let imgModal = (src, currentIndex) => {
//     const modal = document.createElement("div");
//     modal.classList.add('modal');
//     //add the modal to the parent element with <div class="image-gallery">
//     document.querySelector('.image-gallery').append(modal);
    
//     //adding image to modal
//     const newImage = document.createElement("img");
//     newImage.setAttribute("src", src);
    
    
//     //creating the close button
//     const closeBtn = document.createElement("i");
//     closeBtn.setAttribute("class", "bi bi-x closeBtn");

//     //creating the prev, next button
//     const prevBtn = document.createElement("i");
//     prevBtn.setAttribute("class", "bi bi-caret-left-fill prevButton");

//     const nextBtn = document.createElement("i");
//     nextBtn.setAttribute("class", "bi bi-caret-right-fill nextButton");

    
//     //close function
//     closeBtn.addEventListener('click', ()=> {
//         modal.remove();
//     })

//     prevBtn.addEventListener('click', () => {
//         currentIndex = (currentIndex - 1 + imageElements.length) % imageElements.length;
//         newImage.src = imageElements[currentIndex].src;
//     });
    
//     nextBtn.addEventListener('click', () => {
//         currentIndex = (currentIndex + 1) % imageElements.length;
//         newImage.src = imageElements[currentIndex].src;
//     });


//     modal.append(newImage, closeBtn, prevBtn, nextBtn);

// }













