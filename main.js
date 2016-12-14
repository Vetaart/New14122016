$( document ).ready(function() {
function newClass(parent, prop) {
  var clazz = function() {
    if (clazz.preparing) return delete(clazz.preparing);
    if (clazz.constr) {
      this.constructor = clazz; 
      clazz.constr.apply(this, arguments);
    }
  }
  clazz.prototype = {}; 
  if (parent) {
    parent.preparing = true;
    clazz.prototype = new parent;
    clazz.prototype.constructor = parent;
    clazz.constr = parent; 
  }
  if (prop) {
    var cname = "constructor";
    for (var k in prop) {
      if (k != cname) clazz.prototype[k] = prop[k];
    }
    if (prop[cname] && prop[cname] != Object)
      clazz.constr = prop[cname];
  }
  return clazz;
};
Figure = newClass(null,{
  constructor : function(x,y,name,idNumJ,idNumI)  {
	this.newCanvas = document.createElement('canvas');
	this.ctx = this.newCanvas.getContext('2d');	
	this.newCanvas.width = x;
	this.newCanvas.height = y;
	this.newCanvas.className = name;
   	this.ctx.beginPath();
	this.setSetting(); 
	this.ctx.closePath();
    this.ctx.restore();
	if (!(name=='gridF')) { this.newCanvas.id='i'+idNumI+'j'+idNumJ;  };
	document.body.appendChild(this.newCanvas);
	$(this.newCanvas).css('top', idNumJ*38+'px').css('left', idNumI*38+'px');
  },
    
   setSetting : function()  {
     this.ctx.strokeStyle = 'rgb(0,0,255)';
	 this.ctx.lineWidth = 2;	
	        this.ctx.strokeRect(0, 0, 292, 292);
			this.ctx.stroke();
	    for (var i = 0; i < 9; i++) {
		  for (var j = 0; j < 9; j++) {	
            this.ctx.fillStyle = 'rgb(255,0,51)';
            this.ctx.fillRect(i*38, j*38, 38, 38);
            this.ctx.stroke();      
	        this.ctx.strokeStyle = 'rgb(0,0,139)';
	        this.ctx.strokeRect(i*38, j*38, 38, 38);
			this.ctx.stroke();		
		  }	
		}
		
    }
});
triangle = newClass(Figure, {
  constructor : function(i,j)  { this.constructor.prototype.constructor(32,32,'tF',i,j);},
  setSetting : function() {
	        this.ctx.fillStyle = 'rgb(0,255,255)';
            this.ctx.moveTo(0,32);
            this.ctx.lineTo(32,32);
            this.ctx.lineTo(16,0);
            this.ctx.fill();
            this.ctx.stroke();       
	   
  }
});
///
square = newClass(Figure, {
  constructor : function(i,j)  { this.constructor.prototype.constructor(32,32,'sF',i,j);},
  setSetting : function() {
	       
	        this.ctx.fillStyle = 'rgb(0,0,139)';
            this.ctx.fillRect(0, 0, 32, 32);
            this.ctx.stroke();  
            this.ctx.lineWidth = 2;			
	        this.ctx.strokeStyle = 'rgb(255,255,255)';
	        this.ctx.strokeRect(0, 0, 32, 32);
			this.ctx.stroke();
  }
});
///
circle = newClass(Figure, {
  constructor : function(i,j)  { this.constructor.prototype.constructor(32,32,'cF',i,j);},
  setSetting : function() {
	        this.ctx.arc(16,16,16,0,2*Math.PI,true);
            this.ctx.fillStyle = 'rgb(0,0,205)';
            this.ctx.fill();
            this.ctx.lineWidth = 2; 
	        this.ctx.strokeStyle = 'rgb(255,255,255)';     
	        this.ctx.stroke();
  }
});
var newcan=new Figure(342,342,'gridF',0,0);
///

///
var arrayRE = [/(sF;){3,}/g,/(tF;){3,}/g,/(cF;){3,}/g];
//console.log(arrayRE[0]+"   "+arrayRE[1]+"   "+arrayRE[2]+"   ");
function fillFigures (idF,i,j) {
	if (idF==1) {newcan=new circle(i,j);
					                typeFigure='cF';}
                       else if (idF==2) {newcan=new square(i,j);
					                     typeFigure='sF';}
                       else {newcan=new triangle(i,j);
					          typeFigure='tF';};
	return typeFigure;
};
////
new fillFigures (1,0.4,15);
new fillFigures (2,1.7,15);
new fillFigures (3,3,15);
$('button, [id^="i15j"] ').wrapAll('<div class="managerEl">');

///
function match3Canvas(i,j0,j9,v) {
	var arr=[];
	for (j=j0;j<j9;j++) { 
                       idF = Math.floor(Math.random() * 3 + 1);
					   
                      	if (v=='g') { arr[j] = fillFigures (idF,i,j);}				   
					    else {arr[j] = fillFigures (idF,j,i);};
					   
                       };
					   return arr;
};
////

function formArray (jOld) {
	var arrNew=[];
	for (jo=0;jo<jOld;jo++) 
	{  arrNew[jo]=[];
	      for (io=0;io<9;io++) 
	         {          
                 arrNew[jo][io]= $(document.getElementById('i'+io+'j'+jo)).attr('class');
             };
    };
	//return arrNew;
	//arr.splice(0, jOld+1, arrNew);
	console.log('af '+arrNew);
	return arrNew;
};
/////
 var arrF=[]; 
 setTimeout(function() {
                         var typeFigure='';
                         for (i=0;i<9;i++) { 
                                            arrF[i]=[]; 
                                            arrF[i]=match3Canvas(i,0,9,'g');
											//$('[id^="i'+i+'j"]').wrapAll('<div class="listFigures">');
											console.log('i='+i+' new '+arrF[i]);
											console.log('000new '+arrF);
	                                        deleteMatch3 (arrF[i],i);
											
											arrF.splice(0, i, formArray (i));
											console.log('after '+arrF);
                                           }; 
										  
										  
					   } , 1000);
//
var score_Res=[0,0,0];
function deleteMatch3 (arrFI,ii) 
{ 

var arrRet=[];
var iii =0;
var arr0 =[];

strIzm=arrFI.join(';')+';';
					  
	for (reI=0;reI<3;reI++) 
	{ 
        this.myArray = arrayRE[reI].exec(strIzm);
		this.res = 10 * (reI + 1);
		while (this.myArray) 
		{
					    
		    score_Res[reI]+=res*(myArray[0].length/3);
			for (elemIJ=0;elemIJ<myArray[0].length/3;elemIJ++) 
			{
							
				elemI=myArray.index/3 + elemIJ;
				jQuery.fx.interval = 100;			
                $('#score'+reI).text(score_Res[reI]);
				
				$('#i'+elemI+'j'+ii).animate({ opacity: 0.25, height: 'toggle'  }, { duration: 1000,complete:function(iii=ii,eI=elemI) {
					                                                                                                      this.remove();
				                                                                                                        
																														}});
				
				if (ii>0) {iii=ii-1;} else {iii=-1;};
				
				while (iii>=0) {
				$('#i'+elemI+'j'+iii).animate({ opacity: 1, top: '+=38'  }, 2000, function() { 
				                                                                                 $(this).prependTo( $(this).parent() );
				                                                                              }).attr('id','i'+elemI+'j'+(iii+1));
				
				iii--;
				};
				arr0=match3Canvas(elemI,0,1,'v');
				$('#i'+elemI+'j0').animate({ opacity: 0, height: 'hide'  }, 1000, function() { });
				$('#i'+elemI+'j0').animate({ opacity: 1, height: 'show'  }, 1000, function() { });
			
			};
			this.myArray = arrayRE[reI].exec(strIzm);
		};
	};
	
};
//

//$jx(this).prependTo( $jx(this).parent() );

});
