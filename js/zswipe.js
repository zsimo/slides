// backbone style
(function (){

    //console.log("dddd");

}).call(this);

// single app style
(function() {

    // Good: the name is local to this module
  var ZSwipe = {};

  // Good: implementation detail is clearly local to the closure
  //function processBar(){
    //...
    //}

  //FooMachine.doFoo = function(bar) {
    //processBar(bar);
    // ...
  //};

  // Good: only exporting the public interface,
  // internals can be refactored without worrying
  return ZSwipe;

}());





(function() {

    document.getElementsByTagName('html')[0].addEventListener("touchmove", function(evt) {

        var touches = evt.changedTouches[0];
        // touches.screenX la lunghezza dello schermo
        // considera anche lo schermo esteso

        //console.log("X "+touches.pageX);
        //console.log("Y "+touches.pageY);

        //console.log(touches);

    }, false);

}());


// backbone style
(function (){

    ZSwipe = {};

    ZSwipe.init = function() {
        document.getElementsByTagName('html')[0].addEventListener("touchmove", function(evt) {

            var touches = evt.changedTouches[0];
            // touches.screenX � la lunghezza dello schermo
            // considera anche lo schermo esteso

            this._x = touches.pageX;
            this._y = touches.pageY;

            // console.log("X "+ this._x);
            // console.log("Y "+ this._y);

        }, false);

        document.getElementsByTagName('html')[0].addEventListener("touchstart", function(evt) {

            var touches = evt.changedTouches[0];
            // touches.screenX � la lunghezza dello schermo
            // considera anche lo schermo esteso
            this.start_x = touches.pageX;
            this.start_y = touches.pageY;
            // console.log("X "+ this._x);
            // console.log("Y "+ this._y);
            //console.log("touch start");
            this.start = $.now();

        }, false);

        document.getElementsByTagName('html')[0].addEventListener("touchend", function(evt) {

            var touches = evt.changedTouches[0];
            // touches.screenX � la lunghezza dello schermo
            // considera anche lo schermo esteso
            this.end_x = touches.pageX;
            this.end_y = touches.pageY;
            // console.log("X "+ this._x);
            // console.log("Y "+ this._y);

            this.time = $.now() - this.start;
            //console.log("touch end: "+ this.time);
            //console.log(this.end_x - this.start_x);

            this.distance_x =this.end_x - this.start_x;
            this.distance_y =this.end_y - this.start_y;
            console.log(this.distance_y);

            if (this.time < 500 && Math.abs(this.distance_y) < 100) {

                // swipe right
                if (this.distance_x > 100) {
                    alert("%cswipe right", "color: red;");
                    this.right_swipe = true;
                }
                else if (this.distance_x < - 100) {
                    alert("%cswipe left", "color: red;");
                    this.left_swipe = true;
                }
                else {
                    this.right_swipe = false;
                    this.left_swipe = false;
                }

            }


        }, false);
    };


}).call(this);


ZSwipe.init();
//console.log(Math.abs(-20));
//console.log("touchmove" in window);

