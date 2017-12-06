// basic navigation & menu button animations

function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(function () {
    setTimeout(function () {
        fadeIn(document.getElementsByClassName('fade-content')[0], 500);
    }, 400);
});

// higher speed is slower fadeIn
function fadeIn(el, speed) {
    if (speed === undefined) {
        speed = 400;
    }

    el.style.opacity = 0;
    var last = +new Date();
    var tick = function() {
        el.style.opacity = +el.style.opacity + (new Date() - last) / speed;
        last = +new Date();

        if (+el.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }
    };

    tick();
}

function fadeOut(el, speed) {
    if (speed === undefined) {
        speed = 400;
    }

    el.style.opacity = 1;
    var last = +new Date();
    var tick = function() {
        el.style.opacity = +el.style.opacity - (new Date() - last) / speed;
        last = +new Date();

        if (+el.style.opacity > 0) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }
    };

    tick();
}

function toggleClass(el, className) {
    if (!el) {
        return;
    }
    if (el.classList) {
        el.classList.toggle(className);
    } else {
        var classes = el.className.split(' ');
        var existingIndex = classes.indexOf(className);

        if (existingIndex >= 0)
            classes.splice(existingIndex, 1);
        else
            classes.push(className);

        el.className = classes.join(' ');
    }
}

function removeClass(el, className) {
    if (!el) {
        return;
    }
    if (el.classList) {
        el.classList.remove('is-active');
    } else {
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
}

var showNav = false;
var menuButton = document.getElementById('menu-icon');
var exitLink = document.getElementById('exit-link');
var navigation = document.getElementById('navigation');
var listItems = navigation.children[0].children;

menuButton.onclick = function () {
    toggleClass(menuButton, 'is-active');
    toggleClass(exitLink, 'gray');
    
    if (showNav === false) {
        navigation.style.display = 'block';
        fadeIn(navigation, 200)
        
        setTimeout(function () {
            for (var i = 0; i < listItems.length; i++) {
                fadeIn(listItems[i], 100)
            }
        }, 300);
    } else {
        fadeOut(navigation, 200)
        setTimeout(function () {
            for (var i = 0; i < listItems.length; i++) {
                listItems[i].style.opacity = 0;
            }
            navigation.style.display = 'none';
        }, 300);
    }

    showNav = !showNav;
};

function displayOnDesktop () {
    if (window.innerWidth > 900) {
        navigation.style.display = 'block';
        navigation.style.opacity = 1;

        for (var i = 0; i < listItems.length; i++) {
            listItems[i].style.opacity = 1;
        }

        showNav = false;
    } else if (window.innerWidth <= 900 && showNav === false) {
        navigation.style.display = 'none';
        navigation.style.opacity = 0;

        for (var i = 0; i < listItems.length; i++) {
            listItems[i].style.opacity = 0;
        }

        removeClass(menuButton, 'is-active');
        removeClass(exitLink, 'gray');
    }
} 

window.addEventListener('resize', displayOnDesktop, false);
