var mobile = false;
    if (window.innerWidth <= 966) {
        mobile = true;
    }

var animated = true;
if (window.innerWidth > 991) {
    var stargazer = document.createElement('script');
    stargazer.src = './res/js/stargazer.dev.js';
    stargazer.type = 'text/javascript';
    document.body.appendChild(stargazer);
}
else {animated = false;}

// var headerHome = document.getElementById('header-home');
// var fullName = document.getElementById('full-name-title');
// function animHeader () {
//     scroll = wndow.scrollY;
//     if (window.scrollY < 100) {

//     } else {
//         // if not already set

//     }
// }

// window.addEventListener('scroll', animHeader, false);
