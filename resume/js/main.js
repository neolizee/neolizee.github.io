// One Page Nav Settings
$(document).ready(function () {
    $('#nav').onePageNav({
        currentClass: 'current',
        scrollSpeed: 1000,
        easing: 'swing'
    });
});

// Slide Navigation
window.onscroll = function () { myFunction() };

let navbar = document.querySelector("navigation");
let sticky = navbar.offsetTop;

function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky", "animated", "fadeIn");
    } else {
        navbar.classList.remove("sticky", "animated", "fadeIn");
    }
}