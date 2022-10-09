function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
    slider1.value = 20;
    var angle = 0;
    var cloud_pos1 = 20;
    var cloud_pos2 = 220;
    var cloud_pos3 = 420;
    function draw() {
    requestAnimationFrame(draw);
	canvas.width = canvas.width;
	// use the sliders values, which would further decided
    // the movement speed of clouds and blades
	var wind_intensity = slider1.value*0.05;
    angle += wind_intensity*0.01;
    cloud_pos1 +=  wind_intensity * 0.1;
    cloud_pos2 += wind_intensity * 0.125;
    cloud_pos3 += wind_intensity * 0.1;
    // these if conditions are used to judge if clods are out of boundries
    if (cloud_pos1>500){
        cloud_pos1 = 0;
    }
    if (cloud_pos2>500){
        cloud_pos2 = 0;
    }
    if (cloud_pos3>500){
        cloud_pos3 = 0;
    }
	
    // basic functions of using matrix transformation
	function moveToTx(loc,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.moveTo(res[0],res[1]);}

	function lineToTx(loc,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.lineTo(res[0],res[1]);}
	
    //draw a house body
    function house(Tx){
        context.beginPath();
        context.strokeStyle = "black";
        context.fillStyle = "#800";
        moveToTx([0,0],Tx);
        lineToTx([-40,70],Tx);
        lineToTx([40,70],Tx);
        context.closePath();context.fill();context.stroke();
        moveToTx([0,0],Tx);lineToTx([40,70],Tx);lineToTx([70,45],Tx);lineToTx([30,-25],Tx);
        context.closePath();context.fill();context.stroke();
    }
    // draw another part of house
    function house_2(Tx){
        context.beginPath();
        context.fillStyle = "gray";
        moveToTx([-40,70],Tx);
        context.rect(160,220,80,80);context.fill();context.stroke();
        moveToTx([40,70],Tx);lineToTx([70,45],Tx);lineToTx([70,125],Tx);
        lineToTx([40,150],Tx);context.closePath();context.fill();context.stroke();

    }
    // draw a single blade
    function drawblade(Tx){
        context.beginPath();
        context.fillStyle = "orange";
        context.strokeStyle = "orange";
        moveToTx([0,0],Tx);
        lineToTx([0,20],Tx);
        context.stroke();
        moveToTx([-10,20],Tx);
        lineToTx([-15,120],Tx);
        lineToTx([15,120],Tx);
        lineToTx([10,20],Tx);
        context.closePath();
        context.fill();
    }
    //draw four blades by calling drawblade() and apply matrix rotate here
    function drawfourblades(T_blade_to_canvas){
        
        drawblade(T_blade_to_canvas);
        mat3.rotate(T_blade_to_canvas,T_blade_to_canvas,-Math.PI/2);
        drawblade(T_blade_to_canvas);
        mat3.rotate(T_blade_to_canvas,T_blade_to_canvas,-Math.PI/2);
        drawblade(T_blade_to_canvas);
        mat3.rotate(T_blade_to_canvas,T_blade_to_canvas,-Math.PI/2);
        drawblade(T_blade_to_canvas);
    }

    // spining the blades by call drawfourblades() and apply a rotating angle
    function spin_blades(angle,Tx){
        mat3.rotate(Tx,Tx,angle);
        drawfourblades(Tx);
    }
    // draw backgound sky blue color
    function draw_background_upper(){
        context.fillStyle = 'rgb(0,255,255)';
        context.rect(0,0,500,300);
        context.fill();    
    }
    // import clode image and draw them multple times
    function draw_cloud(cloud_pos1,cloud_pos2,cloud_pos3){
        cloud_img = new Image();
        cloud_img.src = 'cloud.png';
        context.drawImage(cloud_img,cloud_pos1,50,80,60);
        context.drawImage(cloud_img,cloud_pos2,25,80,60);
        context.drawImage(cloud_img,cloud_pos3,75,80,60);
    }

    draw_background_upper();
    draw_cloud(cloud_pos1,cloud_pos2,cloud_pos3);
    var T_house_to_canvas = mat3.create();
    mat3.fromTranslation(T_house_to_canvas,[200,150]);
    house(T_house_to_canvas);
    house_2(T_house_to_canvas);

    var T_blade_to_canvas = mat3.create();
    mat3.fromTranslation(T_blade_to_canvas,[200,150]);
    spin_blades(angle,T_blade_to_canvas);

    }

    //slider1.addEventListener("input",draw);
    draw();
}
window.onload = setup;
