/**
 * Created by Simone.Sacchi on 08/04/2017.
 */


"use strict";
// https://developer.mozilla.org/en-US/docs/Web/Events/resize
(function() {
    var throttle = function(type, name) {
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function() {
                window.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        window.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle("resize", "optimizedResize");
})();

var slides_id = [];
if (location.hash === "") {
    location.hash = "#!slide1";
}
var browserHeight = window.innerHeight || Math.max(document.documentElement.clientHeight, document.body.clientHeight);
var index = parseInt(location.hash.substring(7));
var count = 1;

$('div[id^=slide]').each(function() {
    slides_id.push(this.id);
    //$('this').addClass('hide');
    if (count === index) {
        this.className = "slide";
    }
    else {
        this.className = "slide hide";
    }

    this.style.height = ((browserHeight / 100) * 80) + "px";

    count += 1;
});

var slides_number = slides_id.length;


$(document).keydown(function(e) {

    // left arrow
    if (e.keyCode === 37) {

        if (index > 1) {

            $("#slide"+index).removeClass('animated fadeInLeftBig');
            $("#slide"+index).toggleClass('hide');
            index -= 1;
            location.hash = "#!slide"+index;
            $("#slide"+index).toggleClass('hide');
            $("#slide"+index).addClass('animated fadeInLeftBig');

        }
    }
    // right arrow
    else if (e.keyCode === 39) {

        if (index < slides_number) {

            $("#slide"+index).removeClass('animated fadeInRightBig');
            $("#slide"+index).toggleClass('hide');
            index += 1;
            location.hash = "#!slide"+index;
            $("#slide"+index).toggleClass('hide');
            $("#slide"+index).addClass('animated fadeInRightBig');

        }

    }


});

Hammer(document.getElementById('body')).on("swipeleft", function() {
    if (index < slides_number) {
        $("#slide"+index).removeClass('animated fadeInRightBig');
        $("#slide"+index).toggleClass('hide');
        index += 1;
        $("#slide"+index).toggleClass('hide');
        $("#slide"+index).addClass('animated fadeInRightBig');
    }

});

Hammer(document.getElementById('body')).on("swiperight", function() {
    if (index > 1) {
        $("#slide"+index).removeClass('animated fadeInLeftBig');
        $("#slide"+index).toggleClass('hide');
        index -= 1;
        $("#slide"+index).toggleClass('hide');
        $("#slide"+index).addClass('animated fadeInLeftBig');
    }
});

function locationHashChanged() {

    var hash = location.hash;

    // console.log(hash);

    if (hash === '#!mongodb') {

    }



}

if ("onhashchange" in window) {

    // console.log("this browser support the hashChange event");

    // voglio che controlli l'hash anche al caricamento della pagina
    // se il browser supporta questo evento
    locationHashChanged();

}

window.onhashchange = locationHashChanged;



function resize () {
    var browserHeight = window.innerHeight || Math.max(document.documentElement.clientHeight, document.body.clientHeight);

    var slides = document.getElementsByClassName("slide");

    for (var i = 0, len = slides.length; i < len; i += 1) {
        slides[i].style.height = ((browserHeight / 100) * 80) + "px";
    }

}

window.addEventListener("optimizedResize", function() {
    resize();
});

