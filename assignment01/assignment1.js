function setup() { "use strict";
  var canvas = document.getElementById('myCanvas');
  var slider1 = document.getElementById('slider1');
  slider1.value = 0;
  var slider2 = document.getElementById('slider2');
  slider2.value = 0;
  var slider3 = document.getElementById('slider3');
  slider3.value = 0;
  function draw() {
    var context = canvas.getContext('2d');
    canvas.width = canvas.width;
    // use the sliders to get various parameters
    var dx = slider1.value;
    var dy = slider2.value;
    var dz = slider3.value;
    function DrawBall() {
        //draw ball
        context.beginPath();
        context.arc(40, 200, 21, 0, Math.PI * 2);
        context.fillStyle = "orange";
        context.fill();
        context.closePath();

        // draw curve line on the basketball
        context.strokeStyle = "black"
        context.beginPath();
        context.moveTo(25,186);
        context.bezierCurveTo(35,186,35,214,25,214)
        context.stroke();
        context.beginPath();
        context.moveTo(40,180);context.lineTo(40,220);
        context.stroke();
        context.beginPath();
        context.moveTo(55,186)
        context.bezierCurveTo(45,186,45,214,55,214)
        context.stroke();
        context.moveTo(20,200);context.lineTo(60,200);
        context.stroke();
    }
    
    function DrawHoops(color) {
      // draw blanket
      context.fillStyle = color;
      context.beginPath();
      context.moveTo(500,65);context.lineTo(650,50);context.lineTo(650,150);context.lineTo(500,165);
      context.closePath();
      context.fill()
      // fake square on the blanket
      context.beginPath();
      context.strokeStyle="white";
      //context.strokeStyle = "#800";
      context.moveTo(550,160);context.lineTo(550,120);context.lineTo(600,115);context.lineTo(600,155);
      context.closePath();
      context.stroke();
      // draw hoop
      context.beginPath();
      context.lineWidth = 3;
      context.strokeStyle="red";
      context.ellipse(575,178,20,30,Math.PI/2,0,2*Math.PI)
      context.stroke();
     }

    DrawHoops("gray");
    context.save();
    context.translate(dx,0.00225*dx*dx-1.58262*dx+170);
    DrawBall();
    context.restore();
    context.save();
    context.translate(dy,0.00225*dy*dy-1.28262*dy+170);
    DrawBall();
    context.restore();
    
    context.translate(dz,0.00225*dz*dz-1.98262*dz+170);
    DrawBall();
    context.restore();
  }
  slider1.addEventListener("input",draw);
  slider2.addEventListener("input",draw);
  slider3.addEventListener("input",draw)
  draw();
}
window.onload = setup;
