/*
Name: Luka Jovanovic, Pouya Karimi
Date: January 20th, 2022
Teacher: Mr. Gugoiu
Description: This program is a mathematics website, designed to help Grade 10 math students
and teachers. The website is made up of 4 different parts:
    A: Graphing Calculator
    B: Photo Math Solver
    C: Algebra Calculator
    D: Triangle Solver
Each part can be accessed from the home page, as well as all other tabs. 
*/
var interval = window.setInterval(siteLoop, 1);

function TxtType(element, toRotate, period) {
    this.toRotate = toRotate;
    this.el = element;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.isDeleting = false;

    this.tick = function() {
        var i = this.loopNum % this.toRotate.length;  // get which message should currently be displayed
        var fullTxt = this.toRotate[i];  // get message

        // increase and decrease string
        if (this.isDeleting)
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        else
            this.txt = fullTxt.substring(0, this.txt.length + 1);

        // update text
        this.el.innerHTML = '<span>' + this.txt + '</span>';

        var that = this;  // so element can be called within sub function
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting)
            delta /= 2;

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;  // pause when message fully typed
        }

        setTimeout(function() {
            that.tick();  // tick consistently, pause when fully typed
        }, delta);
    }

    this.tick();
}

window.onload = function() {
    // create typewriter
    var element = document.getElementById('typewriter');
    var toRotate = element.getAttribute('data-type');
    var period = element.getAttribute('data-period');
    if (toRotate)
        new TxtType(element, JSON.parse(toRotate), period);
};


// check if element is visible on screen
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}

function siteLoop() {
    let slide_elements = document.getElementsByClassName('slide-up-fade-in');


    // slide up element when its visible in the viewport
    for (let i = 0; i < slide_elements.length; i++) {
        if (isElementInViewport(slide_elements[i])) {
            slide_elements[i].style = `
                visibility: visible;
                animation: slide-up-fade-in ease 1s;
                animation-iteration-count: 1;
                transform-origin: 50% 50%;
                animation-fill-mode:forwards;
                -webkit-animation: slide-up-fade-in ease 1s;
                -webkit-animation-iteration-count: 1;
                -webkit-transform-origin: 50% 50%;
                -webkit-animation-fill-mode:forwards;
                -moz-animation: slide-up-fade-in ease 1s;
                -moz-animation-iteration-count: 1;
                -moz-transform-origin: 50% 50%;
                -moz-animation-fill-mode:forwards;
                -o-animation: slide-up-fade-in ease 1s;
                -o-animation-iteration-count: 1;
                -o-transform-origin: 50% 50%;
                -o-animation-fill-mode:forwards;
                -ms-animation: slide-up-fade-in ease 1s;
                -ms-animation-iteration-count: 1;
                -ms-transform-origin: 50% 50%;
                -ms-animation-fill-mode:forwards;
                opacity: 0;
                opacity: 1/9;
            `;
        }
    }

    // set orb animation as background to element
    let intro_element = document.getElementsByClassName("intro-container")[0];
    let canvas = document.getElementById("main-background");
	intro_element.style.background = `url(${canvas.toDataURL()})`;
}

