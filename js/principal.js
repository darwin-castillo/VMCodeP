var maxMemoria = 20;
var pilaTemporal  = [];
var memoriaDatos = [maxMemoria];
var memoriaCodigo = [maxMemoria]; 
var lineaActual = -1;
var posActualMemoria = 0;
var basurero = [];
var counterDebug = 0;
var salida="";
 var lineas = [];
 var comandos = ['LDA','LDC','LOD','ADI','SBI','MPI','STO','GRT','FJP','EQU','RDI','WRI','LAB','IXA','IND','STP']; 

window.onload = function () {

    for (var i = memoriaDatos.length - 1; i >= 0; i--) {
    	memoriaDatos[i] = 0 ;
    };
	leerLinea();
}

function ejecutar(){
	  var lineas =obtenerLineas();
  var salidaHTML = document.getElementById('salida');
    document.getElementById('debug').style.display = 'disabled';
  
var stop = false;
lineaActual = 0;
var i=0;
console.log(i," - ",lineas.length);
while(i<lineas.length){
			//console.log("instruccion:  ",item.instruccion," index ",index);
			var item = lineas[i];
			var ob={};
			if(item.instruccion==='LDC')
				ob = instruccionLDC(item.valor);

			else if(item.instruccion==='LOD')
			{	ob=instruccionLOD(item.valor);

			}			
			else if(item.instruccion==='ADI')
				ob=instruccionADI(item.valor);

			else if(item.instruccion==='LDA')
				ob=instruccionLDA(item.valor);

			else if(item.instruccion==='STO')
			    ob=instruccionSTO();
			 else if(item.instruccion==='FJP')
			    {   var salto = buscarLabel(item.valor);
			    	ob=instruccionFJP();
			    	if(!ob.valor)
			        	i=salto-1;
			        else{
			        	ob.comentario="OP: FJP No hubo salto condicion true";
			        }
			    }
			    else if(item.instruccion==='SBI')
			    	ob=instruccionSBI();

			  else if(item.instruccion==='MPI')
			    	ob=instruccionMPI();
			  
			  else if(item.instruccion==='EQU')
			    	ob=instruccionEQU();
			  
			  else if(item.instruccion==='GRT')
			    	ob=instruccionGRT();

			  else if(item.instruccion==='WRI')
			    	ob=instruccionWRI();

			    else if(item.instruccion==='IXA')
			    	ob=instruccionIXA();

			       else if(item.instruccion==='IND')
			    	ob=instruccionIND();

			    else if(item.instruccion==='STP'){
			    	ob.comentario="OP: STP el programa se detiene";
			    	i=lineas.length;
			    }

			  else if(item.instruccion==='LAB')
			    	ob={comentario:'OP: LAB Ubicados en la etiqueta '+item.valor }

			   else if(item.instruccion==='RDI'){
			 //  ob.comentario=prompt("insterte algo: ")+"por teclado";
			 var leer = prompt("Lectura de datos: ");
 					ob=instruccionRDI(leer);
			   } 


			  else
			     	ob={comentario:'COMANDO DESCONOCIDO'};
			console.log("concatenando: "+ob);
			salida+=ob.comentario;

			console.log(ob)
			salida+='<br/>';
			setTimeout(function(){
				console.log("--.--");
			},1000);
	i++;		
}
 document.getElementById('pila').innerHTML = "pila Temporal: "+pilaTemporal;
	 document.getElementById('salida').innerHTML = salida;
	 console.log('pilaTemporal :',pilaTemporal);
	 console.log('memoriaCodigo: ',memoriaCodigo);
	 console.log('memoriaDatos: ',memoriaDatos);
	 document.getElementById('memoria').innerHTML = "Memoria de datos: "+memoriaDatos;

}

function debug(){
	  var lineas =obtenerLineas();
  var salidaHTML = document.getElementById('salida');
  document.getElementById('ejecutar').style.display = 'none';

lineaActual = 0;
if(counterDebug<lineas.length)
{
			//console.log("instruccion:  ",item.instruccion," index ",index);
			var item = lineas[counterDebug];
			var ob={};
			if(item.instruccion==='LDC')
				ob = instruccionLDC(item.valor);

			else if(item.instruccion==='LOD')
			{	ob=instruccionLOD(item.valor);

			}			
			else if(item.instruccion==='ADI')
				ob=instruccionADI(item.valor);

			else if(item.instruccion==='LDA')
				ob=instruccionLDA(item.valor);

			else if(item.instruccion==='STO')
			    ob=instruccionSTO();
			 else if(item.instruccion==='FJP')
			    {   var salto = buscarLabel(item.valor);
			    	ob=instruccionFJP();
			    	if(!ob.valor)
			        	counterDebug=salto-1;
			        else{
			        	ob.comentario="OP: FJP No hubo salto condicion true";
			        }
			    }
			    else if(item.instruccion==='SBI')
			    	ob=instruccionSBI();

			  else if(item.instruccion==='MPI')
			    	ob=instruccionMPI();
			  
			  else if(item.instruccion==='EQU')
			    	ob=instruccionEQU();
			  
			  else if(item.instruccion==='GRT')
			    	ob=instruccionGRT();

			  else if(item.instruccion==='WRI')
			    	ob=instruccionWRI();


                 else if(item.instruccion==='STP'){
			    	ob.comentario="OP: STP el programa se detiene";
			    	counterDebug=lineas.length;
			    }
			    else if(item.instruccion==='IXA')
			    	ob=instruccionIXA();

			       else if(item.instruccion==='IND')
			    	ob=instruccionIND();


			  else if(item.instruccion==='LAB')
			    	ob={comentario:'OP: LAB Ubicados en la etiqueta '+item.valor }

			   else if(item.instruccion==='RDI'){
			 //  ob.comentario=prompt("insterte algo: ")+"por teclado";
			 var leer = prompt("Lectura de datos: ");
 					ob=instruccionRDI(leer);
			   } 


			  else
			     	ob={comentario:'COMANDO DESCONOCIDO'};
			console.log("concatenando: "+ob);
			salida+=ob.comentario;

			console.log(ob)
			salida+='<br/>';
			 document.getElementById('pila').innerHTML = "pila Temporal: "+pilaTemporal;
			  document.getElementById('memoria').innerHTML = "Memoria de Datos: "+memoriaDatos;
 counterDebug++;
}
else{
	alert('Fin de linea!!');
}	

	 document.getElementById('salida').innerHTML = salida;
	 console.log('pilaTemporal :',pilaTemporal);

	 console.log('memoriaCodigo: ',memoriaCodigo);
	 console.log('memoriaDatos: ',memoriaDatos);

}




function buscarLabel(val){
	console.log('-------'+val);
	var found=lineas.filter(function(item){
		console.log(item);
       return item.instruccion ==='LAB' && item.valor===val;
	}) ; 
	console.log(found);
return found[0].linea;
}

//lineas.forEach(function(item,index){});