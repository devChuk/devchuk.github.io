// used to determine whether or not to load the stargazer javascript animation

var mobile = false;
    if (window.innerWidth <= 966) {
        mobile = true;
    }

var animated = true;
if (window.innerWidth > 991) {
    var stargazer = document.createElement('script');
    stargazer.src = './res/js/stargazer.min.js';
    stargazer.type = 'text/javascript';
    document.body.appendChild(stargazer);
}
else {animated = false;}
