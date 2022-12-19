var canvas = document.getElementsId("main-background");
canvas.width = document.innerWidth;
canvas.height = document.innerHeight;
var c = canvas.getContext("2d");

ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, canvas.width,canvas.height);


var interval = window.setInterval(siteLoop, 1);

function TxtType(element, toRotate, period) {
    this.toRotate = toRotate;
    this.el = element;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.isDeleting = false;

    this.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting)
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        else
            this.txt = fullTxt.substring(0, this.txt.length + 1);

        this.el.innerHTML = '<span>' + this.txt + '</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting)
            delta /= 2;

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function() {
            that.tick();
        }, delta);
    }

    this.tick();
}

window.onload = function() {
    var elements = document.getElementsByClassName('typewriter');
    console.log(elements);
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
};


function isElementInViewport(el) {

    // Special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

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

    for (let i = 0; i < slide_elements.length; i++) {
        if (isElementInViewport(slide_elements[i])) {
            slide_elements[i].style = `
                visibility: visible;
                animation: slide-up-fade-in ease 1s;
                animation-iteration-count: 1;
                transform-origin: 50% 50%;
                animation-fill-mode:forwards; /*when the spec is finished*/
                -webkit-animation: slide-up-fade-in ease 1s;
                -webkit-animation-iteration-count: 1;
                -webkit-transform-origin: 50% 50%;
                -webkit-animation-fill-mode:forwards; /*Chrome 16+, Safari 4+*/ 
                -moz-animation: slide-up-fade-in ease 1s;
                -moz-animation-iteration-count: 1;
                -moz-transform-origin: 50% 50%;
                -moz-animation-fill-mode:forwards; /*FF 5+*/
                -o-animation: slide-up-fade-in ease 1s;
                -o-animation-iteration-count: 1;
                -o-transform-origin: 50% 50%;
                -o-animation-fill-mode:forwards; /*Not implemented yet*/
                -ms-animation: slide-up-fade-in ease 1s;
                -ms-animation-iteration-count: 1;
                -ms-transform-origin: 50% 50%;
                -ms-animation-fill-mode:forwards; /*IE 10+*/
                opacity: 0;
                opacity: 1/9;
            `;
        }
    }
}

