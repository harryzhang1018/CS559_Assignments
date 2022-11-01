function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
    slider1.value = 150;
	var slider2 = document.getElementById('slider2');
    slider2.value = 150;
	var velocity = 5;
	var tparam_1 = 0;
	var tparam_2 = 2;
    function draw() {
	requestAnimationFrame(draw);
	canvas.width = canvas.width;
	// use the sliders to get the angles
	tparam_1 += velocity*0.00001*slider1.value;
	tparam_2 += velocity*0.00001*slider2.value;
	if (tparam_1 > 3){
		tparam_1 = 0.0;
	}
	if (tparam_2 > 3){
		tparam_2 = 0.0;
	}
	function moveToTx(loc,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.moveTo(res[0],res[1]);}

	function lineToTx(loc,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.lineTo(res[0],res[1]);}
	
	function drawObject(color,Tx) {
	    context.beginPath();
	    context.fillStyle = color;
	    moveToTx([-.04,-.04],Tx);
	    lineToTx([-.04,.04],Tx);
            lineToTx([.04,.04],Tx);
      	    lineToTx([.08,0],Tx);
	    lineToTx([.04,-.04],Tx);
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
	
	// for the car's moving trajectories
	var p0 = [1,0.6];
	var p1 = [1,-0.6];
	var p2 = [-1.2,0];
	var d0 = [1.5,0];
	var d1 = [-1.5,0];
	var d2 = [0,1.75];
	// for the right hand side boundry of racing track
	var p0_r=[1,0.5];
	var d0_r=[1,0];
	var p1_r=[1,-0.5];
	var d1_r=[-1,0];
	var p2_r=[-1.1,0];
	var d2_r =[0,1.5];
	// for the left hand side boundry of racing track
	var p0_l=[1,0.7];
	var d0_l=[1.7,0];
	var p1_l=[1,-0.7];
	var d1_l=[-1.7,0];
	var p2_l = [-1.3,0];
	var d2_l = [0,2];
	// for the car's moving trajectories
	var P0 = [p0,d0,p1,d1];
	var P1 = [p1,d1,p2,d2];
	var P2 = [p2,d2,p0,d0];
	// for the right hand side boundry of racing track
	var P0_R = [p0_r,d0_r,p1_r,d1_r];
	var P1_R = [p1_r,d1_r,p2_r,d2_r]; 
	var P2_R = [p2_r,d2_r,p0_r,d0_r];
	// for the left hand side boundry of racing track
	var P0_L = [p0_l,d0_l,p1_l,d1_l];
	var P1_L = [p1_l,d1_l,p2_l,d2_l];
	var P2_L = [p2_l,d2_l,p0_l,d0_l];
	// for the car's moving trajectories (position)
	var C0 = function(t_) {return Cubic(Hermite,P0,t_);};
	var C1 = function(t_) {return Cubic(Hermite,P1,t_);};
	var C2 = function(t_) {return Cubic(Hermite,P2,t_);};
	// for the right hand side boundry of racing track
	var C0_R = function(t_) {return Cubic(Hermite,P0_R,t_);};
	var C1_R = function(t_) {return Cubic(Hermite,P1_R,t_);};
	var C2_R = function(t_) {return Cubic(Hermite,P2_R,t_);};
	// for the left hand side boundry of racing track
	var C0_L = function(t_) {return Cubic(Hermite,P0_L,t_);};
	var C1_L = function(t_) {return Cubic(Hermite,P1_L,t_);};
	var C2_L = function(t_) {return Cubic(Hermite,P2_L,t_);};
	// for the car's moving trajectories (orientation)
	var C0prime = function(t_) {return Cubic(HermiteDerivative,P0,t_);};
	var C1prime = function(t_) {return Cubic(HermiteDerivative,P1,t_);};
	var C2prime = function(t_) {return Cubic(HermiteDerivative,P2,t_);};
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
	// three piece-wise parametric combine together (oritation)
	var Ccomp_tangent = function(t) {
		if (t<1){
			var u = t;
			return C0prime(u);
			} 
		else if (t>1 && t<2) {
			var u = t-1.0;
			return C1prime(u);
			}  
		else if (t>2 && t<3){
			var u = t - 2.0;
			return C2prime(u);
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

	function draw_background(){
        context.fillStyle = 'rgb(161,161,161)';
        context.rect(0,0,500,350);
        context.fill();    
    }
	// give background gray color
	draw_background()
	// use blue color to draw the boundries of racing tracks
	var Tblack_to_canvas = mat3.create();
	mat3.fromTranslation(Tblack_to_canvas,[200,150]);
	mat3.scale(Tblack_to_canvas,Tblack_to_canvas,[150,-150]); // Flip the Y-axis
	// draw right & left hand side boundries
	drawTrajectory(0.0,1.0,100,C0_R,Tblack_to_canvas,"black");
	drawTrajectory(0.0,1.0,100,C1_R,Tblack_to_canvas,"black");
	drawTrajectory(0.0,1.0,100,C2_R,Tblack_to_canvas,"black");
	drawTrajectory(0.0,1.0,100,C0_L,Tblack_to_canvas,"black");
	drawTrajectory(0.0,1.0,100,C1_L,Tblack_to_canvas,"black");
	drawTrajectory(0.0,1.0,100,C2_L,Tblack_to_canvas,"black");
	// draw two cars with color green and red
	var Tgreen_to_blue = mat3.create();
	var Tred_to_blue = mat3.create();
	// make its position follow C1 curve
	mat3.fromTranslation(Tgreen_to_blue,Ccomp(tparam_1));
	mat3.fromTranslation(Tred_to_blue,Ccomp(tparam_2));

	var Tgreen_to_canvas = mat3.create();
	var Tred_to_canvas = mat3.create();
	// orientation for green car
	var tangent_1 = Ccomp_tangent(tparam_1);
	var angle_1 = Math.atan2(tangent_1[1],tangent_1[0]);
	// orientation for red car
	var tangent_2 = Ccomp_tangent(tparam_2);
	var angle_2 = Math.atan2(tangent_2[1],tangent_2[0]);
	// combine translation and orientation for green car
	mat3.rotate(Tgreen_to_blue,Tgreen_to_blue,angle_1);
	mat3.multiply(Tgreen_to_canvas, Tblack_to_canvas, Tgreen_to_blue);
	drawObject("green",Tgreen_to_canvas);
	// combine translation and orientation for red car
	mat3.rotate(Tred_to_blue,Tred_to_blue,angle_2);
	mat3.multiply(Tred_to_canvas, Tblack_to_canvas, Tred_to_blue);
	drawObject("red",Tred_to_canvas);
    }

    draw();
}
window.onload = setup;

