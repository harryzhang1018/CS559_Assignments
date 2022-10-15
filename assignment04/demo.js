function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
    slider1.value = -25;

    function draw() {
	canvas.width = canvas.width;
	// use the sliders to get the angles
	var tParam = slider1.value*0.01;
	
	function moveToTx(loc,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.moveTo(res[0],res[1]);}

	function lineToTx(loc,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.lineTo(res[0],res[1]);}
	
	function drawObject(color,Tx) {
	    context.beginPath();
	    context.fillStyle = color;
	    moveToTx([-.05,-.05],Tx);
	    lineToTx([-.05,.05],Tx);
            lineToTx([.05,.05],Tx);
      	    lineToTx([.1,0],Tx);
	    lineToTx([.05,-.05],Tx);
	    context.closePath();
	    context.fill();
	}

	var Hermite = function(t) {
	    return [
		2*t*t*t-3*t*t+1,
		t*t*t-2*t*t+t,
		-2*t*t*t+3*t*t,
		t*t*t-t*t
	    ];
	}

	var HermiteDerivative = function(t) {
            return [
		6*t*t-6*t,
		3*t*t-4*t+1,
		-6*t*t+6*t,
		3*t*t-2*t
            ];
	}

	function Cubic(basis,P,t){
	    var b = basis(t);
	    var result=vec2.create();
	    vec2.scale(result,P[0],b[0]);
	    vec2.scaleAndAdd(result,result,P[1],b[1]);
	    vec2.scaleAndAdd(result,result,P[2],b[2]);
	    vec2.scaleAndAdd(result,result,P[3],b[3]);
	    return result;
	}
	
	var p0_r=[1,0.5];
	var d0_r=[1,0];
	var p1_r=[1,-0.5];
	var d1_r=[-1,0];
	var p2_r=[-1.2,0];
	var d2_r =[0,1];

	var p0_l=[1,0.6];
	var d0_l=d0_r;
	var p1_l=[1.25,0];
	var d1_l=d1_r;


	var P0_R = [p0_r,d0_r,p1_r,d1_r]; // First two points and tangents
	var P1_R = [p1_r,d1_r,p2_r,d2_r]; // Last two points and tangents
	var P2_R = [p2_r,d2_r,p0_r,d0_r];

	var P0_L = [p0_l,d0_l,p1_l,d1_l];
	var P1_L = [p1_l,d1_l,p0_l,d0_l];

	var C0_R = function(t_) {return Cubic(Hermite,P0_R,t_);};
	var C1_R = function(t_) {return Cubic(Hermite,P1_R,t_);};
	var C2_R = function(t_) {return Cubic(Hermite,P2_R,t_);};

	var C0_L = function(t_) {return Cubic(Hermite,P0_L,t_);};
	var C1_L = function(t_) {return Cubic(Hermite,P1_L,t_);};

	var C0prime = function(t_) {return Cubic(HermiteDerivative,P0_R,t_);};
	var C1prime = function(t_) {return Cubic(HermiteDerivative,P1_R,t_);};

	var Ccomp = function(t) {
            if (t<1){
		var u = t;
		return C0_R(u);
            } else {
		var u = t-1.0;
		return C1_R(u);
            }          
	}

	var Ccomp_tangent = function(t) {
            if (t<1){
		var u = t;
		return C0prime(u);
            } else {
		var u = t-1.0;
		return C1prime(u);
            }          
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

	// make sure you understand these    

	//drawAxes100unit("black", mat3.create());
	
	var Tblue_to_canvas = mat3.create();
	mat3.fromTranslation(Tblue_to_canvas,[200,150]);
	mat3.scale(Tblue_to_canvas,Tblue_to_canvas,[150,-150]); // Flip the Y-axis
	//drawAxes1unit("grey",Tblue_to_canvas);

	drawTrajectory(0.0,1.0,100,C0_R,Tblue_to_canvas,"red");
	drawTrajectory(0.0,1.0,100,C1_R,Tblue_to_canvas,"blue");
	drawTrajectory(0.0,1.0,100,C2_R,Tblue_to_canvas,"blue");
	// drawTrajectory(0.0,1.0,100,C0_L,Tblue_to_canvas,"red");
	// drawTrajectory(0.0,1.0,100,C1_L,Tblue_to_canvas,"blue");
	var Tgreen_to_blue = mat3.create();
	mat3.fromTranslation(Tgreen_to_blue,Ccomp(tParam));
	var Tgreen_to_canvas = mat3.create();
	var tangent = Ccomp_tangent(tParam);
	var angle = Math.atan2(tangent[1],tangent[0]);
	mat3.rotate(Tgreen_to_blue,Tgreen_to_blue,angle);
	mat3.multiply(Tgreen_to_canvas, Tblue_to_canvas, Tgreen_to_blue);
	drawObject("green",Tgreen_to_canvas);
    }
    
    slider1.addEventListener("input",draw);
    draw();
}
window.onload = setup;

