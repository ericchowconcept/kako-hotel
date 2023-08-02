const menuBurger = document.querySelector('.menu-nav-toggle');
const menuNav = document.querySelector('.primary-navigation');

menuBurger.addEventListener('click', ()=>{
    menuNav.classList.toggle('menu-mobile')
})

const navbar = document.querySelector('header');
