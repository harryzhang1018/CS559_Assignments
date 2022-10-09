function setup() { 
  var canvas = document.getElementById('myCanvas');
  var slider1 = document.getElementById('slider1');
  slider1.value = 20;
  var angle = 0;
  function draw() {
    //angle += 0.1;
    requestAnimationFrame(draw);
    var context = canvas.getContext('2d');
    canvas.width = canvas.width;
    // use the sliders to get the angles
    var wind_intensity = slider1.value*0.05;
    angle += wind_intensity*0.01;
    
    // note that this only changes the y
    // X just stays the same
    // the coordinate systems will move
    function blade(color1) {
      
      context.beginPath();
      context.fillStyle = color1;
      context.strokeStyle=color1;
      context.moveTo(0,0);
      context.lineTo(0,20);
      context.stroke();
      context.moveTo(-10,20);
      context.lineTo(-15,120);
      context.lineTo(15,120);
      context.lineTo(10,20);
      context.closePath();
      context.fill();
      //context.save();     

      //axes(color);
    }
    
    function house(){
      context.translate(200,150);
      context.beginPath();
      context.strokeStyle = "black";
      context.fillStyle = "#800";
      context.moveTo(0,0);
      context.lineTo(-40,70);context.lineTo(40,70);context.closePath();context.fill();context.stroke();
      context.moveTo(0,0);context.lineTo(40,70);context.lineTo(70,45);context.lineTo(30,-25); context.closePath();context.fill();context.stroke();

      //context.restore();
    }
    function house_part2(){
      //context.translate(200,150);
      context.beginPath();
      context.fillStyle = "gray";
      context.rect(-40,70,80,80);context.fill();context.stroke();
      context.moveTo(40,70);context.lineTo(70,45);context.lineTo(70,125);context.lineTo(40,150); context.closePath();context.fill();context.stroke();
    }

    function fourblades(rotate_angle){
      //context.translate(200,150);
      context.rotate(rotate_angle);  
      blade("orange");
      context.save();

      context.rotate(Math.PI/2);     
      blade("orange");
      context.save();    
      
      context.rotate(Math.PI/2);     
      blade("orange");
      context.save();  
      
      context.rotate(Math.PI/2);     
      blade("orange");
      context.save(); 
    } 
    // function spinblades(){
      
    //   context.rotate(angle);
    //   fourblades();
    //   angle = (angle + 0.1) % Math.PI*2;

    // }
    context.restore();
    house()
    house_part2();
    context.save();
    
    fourblades(angle);
    context.restore();
    //window.requestAnimationFrame(draw);
    // context.save();
    //window.requestAnimationFrame(draw);
   
  }
  draw();
                  
  //slider1.addEventListener("input",draw);
  //requestAnimationFrame(draw);
}
window.onload = setup;

