function setup() {
    var observerCanvas = document.getElementById('observerCanvas');
    var cameraCanvas = document.getElementById('cameraCanvas');
    var observerContext = observerCanvas.getContext('2d');
    var cameraContext = cameraCanvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
    slider1.value = 0;
    var slider2 = document.getElementById('slider2');
    slider2.value = 0;
    var slider3 = document.getElementById('slider3');
    slider3.value = 0;
    var rot_angle = 0;
    var context = cameraContext; // default to drawing in the camera window
    var tParam = 0;
    function draw() {
    requestAnimationFrame(draw);
    // clear both canvas instances
	observerCanvas.width = observerCanvas.width;
	cameraCanvas.width = cameraCanvas.width;
    rot_angle += 0.5;
	// use the sliders to get the angles
	tParam += slider1.value*0.0000005;
    var shape_twist = slider3.value;
    if (tParam > 3){
		tParam = 0.0;
	}
    var viewAngle = slider2.value*0.02*Math.PI;
     
	function moveToTx(loc,Tx)
	{var res=vec3.create(); vec3.transformMat4(res,loc,Tx); context.moveTo(res[0],res[1]);}

	function lineToTx(loc,Tx)
	{var res=vec3.create(); vec3.transformMat4(res,loc,Tx); context.lineTo(res[0],res[1]);}
	
	function drawObject(color,TxU,scale) {
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx,Tx,[scale,scale,scale]);
        context.beginPath();
	    context.fillStyle = color;
	    moveToTx([-.05,0,-.05],Tx);
	    lineToTx([-.05,0,.05],Tx);
        lineToTx([.05,0,.05],Tx);
      	//lineToTx([.1,0,0],Tx);
	    lineToTx([.05,0,-.05],Tx);
	    context.closePath();
	    context.fill();
        context.beginPath();
        context.lineWidth = 2;
        moveToTx([-.04,0,-.04],Tx);
        lineToTx([-.1,0,-.1],Tx);
        moveToTx([-.04,0,.04],Tx);
        lineToTx([-.1,0,.1],Tx);
        moveToTx([.04,0,-.04],Tx);
        lineToTx([.1,0,-.1],Tx);
        moveToTx([.04,0,.04],Tx);
        lineToTx([.1,0,.1],Tx);
        //adding a "holder" for blades at four corners
        moveToTx([-.1,0,-.1],Tx);
        lineToTx([-.1,0.05,-.1],Tx);
        moveToTx([-.1,0,.1],Tx);
        lineToTx([-.1,0.05,.1],Tx);
        moveToTx([.1,0,-.1],Tx);
        lineToTx([.1,0.05,-.1],Tx);
        moveToTx([.1,0,.1],Tx);
        lineToTx([.1,0.05,.1],Tx);
        context.stroke();

        drawBlades(Tx,rot_angle);
        
	}

    function drawBlades(Tx,rot_angle){
        context.beginPath();
        context.strokeStyle="black";
        var blade_end1 = vec3.create();
        blade_end1 = [-0.1,0.05,-0.15];
        vec3.rotateY(blade_end1,blade_end1,[-0.1,0.05,-0.1],rot_angle);
        var blade_end2 = vec3.create();
        blade_end2 = [-0.1,0.05,-0.05];
        vec3.rotateY(blade_end2,blade_end2,[-0.1,0.05,-0.1],rot_angle);
        moveToTx([-0.1,0.05,-0.1],Tx);
        lineToTx(blade_end1,Tx);
        lineToTx(blade_end2,Tx);
        context.stroke();

        context.beginPath();
        context.strokeStyle="black";
        var blade_end3 = vec3.create();
        blade_end3 = [0.1,0.05,-0.15];
        vec3.rotateY(blade_end3,blade_end3,[0.1,0.05,-0.1],rot_angle+0.1);
        var blade_end4 = vec3.create();
        blade_end4 = [0.1,0.05,-0.05];
        vec3.rotateY(blade_end4,blade_end4,[0.1,0.05,-0.1],rot_angle+0.1);
        moveToTx([0.1,0.05,-0.1],Tx);
        lineToTx(blade_end3,Tx);
        lineToTx(blade_end4,Tx);
        context.stroke();

        context.beginPath();
        context.strokeStyle="black";
        var blade_end5 = vec3.create();
        blade_end5 = [0.1,0.05,0.15];
        vec3.rotateY(blade_end5,blade_end5,[0.1,0.05,0.1],rot_angle+0.1);
        var blade_end6 = vec3.create();
        blade_end6 = [0.1,0.05,0.05];
        vec3.rotateY(blade_end6,blade_end6,[0.1,0.05,0.1],rot_angle+0.1);
        moveToTx([0.1,0.05,0.1],Tx);
        lineToTx(blade_end5,Tx);
        lineToTx(blade_end6,Tx);
        context.stroke();

        context.beginPath();
        context.strokeStyle="black";
        var blade_end7 = vec3.create();
        blade_end7 = [-0.1,0.05,0.15];
        vec3.rotateY(blade_end7,blade_end7,[-0.1,0.05,0.1],rot_angle+0.1);
        var blade_end8 = vec3.create();
        blade_end8 = [-0.1,0.05,0.05];
        vec3.rotateY(blade_end8,blade_end8,[-0.1,0.05,0.1],rot_angle+0.1);
        moveToTx([-0.1,0.05,0.1],Tx);
        lineToTx(blade_end7,Tx);
        lineToTx(blade_end8,Tx);
        context.stroke();
    }
	
    function drawCamera(color,TxU,scale) {
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx,Tx,[scale,scale,scale]);
        context.beginPath();
	    context.strokeStyle = color;
        // Twelve edges of a cropped pyramid
        moveToTx([-3,-3,-2],Tx);lineToTx([3,-3,-2],Tx);
        lineToTx([3,3,-2],Tx);lineToTx([-3,3,-2],Tx);
        moveToTx([3,-3,-2],Tx);lineToTx([2,-2,0],Tx);
        lineToTx([2,2,0],Tx);lineToTx([3,3,-2],Tx);
        moveToTx([2,-2,0],Tx);lineToTx([-2,-2,0],Tx);
        lineToTx([-2,2,0],Tx);lineToTx([2,2,0],Tx);
        moveToTx([-2,-2,0],Tx);lineToTx([-3,-3,-2],Tx);
        lineToTx([-3,3,-2],Tx);lineToTx([-2,2,0],Tx);
        context.stroke();
    }
      
    function draw3DAxes(color,TxU,scale) {
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx,Tx,[scale,scale,scale]);

        context.strokeStyle=color;
	    context.beginPath();
	    // Axes
	    moveToTx([1.2,0,0],Tx);lineToTx([0,0,0],Tx);lineToTx([0,1.2,0],Tx);
        moveToTx([0,0,0],Tx);lineToTx([0,0,1.2],Tx);
	    // Arrowheads
	    moveToTx([1.1,.05,0],Tx);lineToTx([1.2,0,0],Tx);lineToTx([1.1,-.05,0],Tx);
	    moveToTx([.05,1.1,0],Tx);lineToTx([0,1.2,0],Tx);lineToTx([-.05,1.1,0],Tx);
      	moveToTx([.05,0,1.1],Tx);lineToTx([0,0,1.2],Tx);lineToTx([-.05,0,1.1],Tx);
	    // X-label
	    moveToTx([1.3,-.05,0],Tx);lineToTx([1.4,.05,0],Tx);
	    moveToTx([1.3,.05,0],Tx);lineToTx([1.4,-.05,0],Tx);
        // Y-label
        moveToTx([-.05,1.4,0],Tx);lineToTx([0,1.35,0],Tx);lineToTx([.05,1.4,0],Tx);
        moveToTx([0,1.35,0],Tx);lineToTx([0,1.28,0],Tx);
	    // Z-label
	    moveToTx([-.05,0,1.3],Tx);
	    lineToTx([.05,0,1.3],Tx);
	    lineToTx([-.05,0,1.4],Tx);
	    lineToTx([.05,0,1.4],Tx);

	    context.stroke();
	}

    function draw2DAxes(color,Tx) {
	    context.strokeStyle=color;
	    context.beginPath();
	    // Axes
	    moveToTx([120,0,0],Tx);lineToTx([0,0,0],Tx);lineToTx([0,120,0],Tx);
	    // Arrowheads
	    moveToTx([110,5,0],Tx);lineToTx([120,0,0],Tx);lineToTx([110,-5,0],Tx);
	    moveToTx([5,110,0],Tx);lineToTx([0,120,0],Tx);lineToTx([-5,110,0],Tx);
	    // X-label
	    moveToTx([130,0,0],Tx);lineToTx([140,10,0],Tx);
	    moveToTx([130,10,0],Tx);lineToTx([140,0,0],Tx);
        // Y-label
        moveToTx([0,128,0],Tx);lineToTx([5,133,0],Tx);lineToTx([10,128,0],Tx);
        moveToTx([5,133,0],Tx);lineToTx([5,140,0],Tx);
	    context.stroke();
	}

    var Hermite = function(t) {
	    return [
		2*t*t*t-3*t*t+1,
		t*t*t-2*t*t+t,
		-2*t*t*t+3*t*t,
		t*t*t-t*t
	    ];
	}

	function Cubic(basis,P,t){
	    var b = basis(t);
	    var result=vec3.create();
	    vec3.scale(result,P[0],b[0]);
	    vec3.scaleAndAdd(result,result,P[1],b[1]);
	    vec3.scaleAndAdd(result,result,P[2],b[2]);
	    vec3.scaleAndAdd(result,result,P[3],b[3]);
	    return result;
	}
	


	var p0=[20-shape_twist*4.5,-20+shape_twist*4,shape_twist*4];
	var d0=[100,300,0];
	var p1=[100,100,-50];
	var d1=[-100,300,0];
	var p2=[-20,100,200];
	var d2=[0,300,0];

	var P0 = [p0,d0,p1,d1]; // First two points and tangents
	var P1 = [p1,d1,p2,d2]; // Last two points and tangents
    var P2 = [p2,d2,p0,d0];

	var C0 = function(t_) {return Cubic(Hermite,P0,t_);};
	var C1 = function(t_) {return Cubic(Hermite,P1,t_);};
	var C2 = function(t_) {return Cubic(Hermite,P2,t_);};
      
    // three piece-wise parametric combine together (position)
	var Ccomp = function(t) {
            if (t<1){
        var u = t;
        return C0(u);
            } 
            else if (t>1 && t<2) {
        var u = t-1.0;
        return C1(u);
            }  
            else {
        var u = t - 2.0;
        return C2(u);
            }        
    }

    var CameraCurve = function(angle) {
        var distance = 120.0;
        var eye = vec3.create();
        eye[0] = distance*Math.sin(viewAngle);
        eye[1] = 100;
        eye[2] = distance*Math.cos(viewAngle);  
        return [eye[0],eye[1],eye[2]];
    }

    function drawTrajectory(t_begin,t_end,intervals,C,Tx,color) {
	    context.strokeStyle=color;
	    context.beginPath();
        moveToTx(C(t_begin),Tx);
        for(var i=1;i<=intervals;i++){
            var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
            lineToTx(C(t),Tx);
        }
        context.stroke();
	}


    // Create model(ing) transform
    // (from moving object to world)
    var Tmodel = mat4.create();
	mat4.fromTranslation(Tmodel,Ccomp(tParam));

    // create two lookAt transforms; one for the camera
    // and one for the "external observer"

    // Create Camera (lookAt) transform
    //var eyeCamera = Ccomp(tParam);
    var eyeCamera = CameraCurve(viewAngle);
    var targetCamera = vec3.fromValues(0,0,0); // Aim at the origin of the world coords
    var upCamera = vec3.fromValues(0,100,0); // Y-axis of world coords to be vertical
	var TlookAtCamera = mat4.create();
    mat4.lookAt(TlookAtCamera, eyeCamera, targetCamera, upCamera);
      
    // Create Camera (lookAt) transform
    var eyeObserver = vec3.fromValues(500,300,500);
    var targetObserver = vec3.fromValues(0,50,0); // Observer still looks at origin
    var upObserver = vec3.fromValues(0,1,0); // Y-axis of world coords to be vertical
	var TlookAtObserver = mat4.create();
    mat4.lookAt(TlookAtObserver, eyeObserver, targetObserver, upObserver);
      
    // Create ViewPort transform (assumed the same for both canvas instances)
    var Tviewport = mat4.create();
	mat4.fromTranslation(Tviewport,[200,300,0]);  // Move the center of the
                                                  // "lookAt" transform (where
                                                  // the camera points) to the
                                                  // canvas coordinates (200,300)
	mat4.scale(Tviewport,Tviewport,[100,-100,1]); // Flip the Y-axis,
                                                  // scale everything by 100x
    // make sure you understand these    

    context = cameraContext;

    // Create Camera projection transform
    // (orthographic for now)
    var TprojectionCamera = mat4.create();
    mat4.ortho(TprojectionCamera,-100,100,-100,100,-1,1);
    // Create Observer projection transform
    // (orthographic for now)
    var TprojectionObserver = mat4.create();
    mat4.ortho(TprojectionObserver,-120,120,-120,120,-1,1);
     
    // Create transform t_VP_PROJ_CAM that incorporates
    // Viewport, projection and camera transforms
    var tVP_PROJ_VIEW_Camera = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_Camera,Tviewport,TprojectionCamera);
    mat4.multiply(tVP_PROJ_VIEW_Camera,tVP_PROJ_VIEW_Camera,TlookAtCamera);
    var tVP_PROJ_VIEW_Observer = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_Observer,Tviewport,TprojectionObserver);
    mat4.multiply(tVP_PROJ_VIEW_Observer,tVP_PROJ_VIEW_Observer,TlookAtObserver);
      
	

    // Create transform t_VP_PROJ_VIEW_MOD that incorporates
    // Viewport, projection, camera, and modeling transform
    var tVP_PROJ_VIEW_MOD_Camera = mat4.create();
	mat4.multiply(tVP_PROJ_VIEW_MOD_Camera, tVP_PROJ_VIEW_Camera, Tmodel);
    var tVP_PROJ_VIEW_MOD1_Observer = mat4.create();
	mat4.multiply(tVP_PROJ_VIEW_MOD1_Observer, tVP_PROJ_VIEW_Observer, Tmodel);
    var tVP_PROJ_VIEW_MOD2_Observer = mat4.create();
    mat4.translate(tVP_PROJ_VIEW_MOD2_Observer, tVP_PROJ_VIEW_Observer, eyeCamera);
	var TlookFromCamera = mat4.create();
    mat4.invert(TlookFromCamera,TlookAtCamera);
    mat4.multiply(tVP_PROJ_VIEW_MOD2_Observer, tVP_PROJ_VIEW_MOD2_Observer, TlookFromCamera);

    // Draw the following in the Camera window
    context = cameraContext;
    draw2DAxes("black", mat4.create());
	draw3DAxes("grey",tVP_PROJ_VIEW_Camera,100.0);
    // drawUpVector("orange",upCamera,tVP_PROJ_VIEW_Camera,1.0);
	drawTrajectory(0.0,1.0,100,C0,tVP_PROJ_VIEW_Camera,"blue");
    drawTrajectory(0.0,1.0,100,C1,tVP_PROJ_VIEW_Camera,"blue");
    drawTrajectory(0.0,1.0,100,C2,tVP_PROJ_VIEW_Camera,"blue");
    // draw3DAxes("green", tVP_PROJ_VIEW_MOD_Camera,100.0); // Uncomment to see "model" coords
    drawObject("green",tVP_PROJ_VIEW_MOD_Camera,100.0);

      
    // Draw the following in the Observer window
    context = observerContext;
	draw3DAxes("grey",tVP_PROJ_VIEW_Observer,100.0);  
    // drawUpVector("orange",upCamera,tVP_PROJ_VIEW_Observer,1.0);
    drawTrajectory(0.0,1.0,100,C0,tVP_PROJ_VIEW_Observer,"blue");
    drawTrajectory(0.0,1.0,100,C1,tVP_PROJ_VIEW_Observer,"blue");
    drawTrajectory(0.0,1.0,100,C2,tVP_PROJ_VIEW_Observer,"blue");
    drawObject("green",tVP_PROJ_VIEW_MOD1_Observer,100.0);     
    drawCamera("purple",tVP_PROJ_VIEW_MOD2_Observer,8.0); 
	//drawUVWAxes("purple",tVP_PROJ_VIEW_MOD2_Observer,100.0);  
    }
    
  
    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    draw();
}
window.onload = setup;
