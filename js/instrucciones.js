
function instruccionLDC(val){
 var v= parseInt(val);
 console.log(v);
  if(v!=NaN){
	
	pilaTemporal.push(val);
    var resp ={};
    resp =  {ok:true, valor: val, comentario:'OP: LDC constante cargada a la pila Temporal valor: '+val}
	return resp; 
   }
   else{
   	 resp =  {ok:false, comentario:'debe ser un valor numerico contante',val}
	return resp; 
   }
}

function instruccionLOD(val){
 if(val!==null){
	 if(!parseInt(val)!==NaN){
        
           //  var indice = memoriaCodigo.indexOf(val);
           var indice = parseInt(val);
             console.log("memoriaDatos ",memoriaDatos);      
       	   // console.log("memoriaCodigo ",memoriaCodigo);
             if(indice!==-1){
       	    	var contenido= memoriaDatos[indice];
       	        pilaTemporal.push(contenido);
       	        return respuestaJSON(true,'OP: LOD la direccion de memora '+val+', contiene el valor: '+contenido
                  +' y ha sido cargado a la pila temporal',val);
       	    }
       	   else
       	   	 return  respuestaJSON(false,'indice de memoria no encontrado',null);
       
   }
   else{
   	 resp =  {ok:false, comentario:'las direcciones de memoria deben ser valores alfanumericos',val}
	return resp; 
   }
  }
  else{
  	 resp =  respuestaJSON(false,'no se pudo extraer de memoria, valor nulo',val);
	return resp; 
  }
}

function instruccionADI(){
	if(pilaTemporal.length>=2){
		var content1 = parseInt(pilaTemporal.pop());
		var content2 = parseInt(pilaTemporal.pop());
		var resultado = content1 + content2;
    pilaTemporal.push(resultado);
		return respuestaJSON(true, 'OP: ADI se ha almacenado el valor '+resultado+' al tope de la pila',resultado);
	}
  else{
    return respuestaJSON(false,'No hay elementos suficientes en la pila para realizar la suma',0);
  }
}
 
function instruccionLDA(val){
 // var ind = memoriaCodigo.indexOf(val); 
 var ind = parseInt(val);
  if(ind!==-1){
        pilaTemporal.push(ind);
        return respuestaJSON(true,'OP: LDA se ha almacenado en la pila la direccion de memoria '+ind+'',ind);
  }
  else{
    memoriaDatos[posActualMemoria]=0;
    memoriaCodigo[posActualMemoria]=val;
    var pos = posActualMemoria;
    pilaTemporal.push(pos);
    posActualMemoria++;
     return respuestaJSON(true,'OP: LDA se ha almacenado en la pila una nueva direccion de memoria: '+val+'->'
      +pos,pos);

  }

}
 
function instruccionSTO(){

  var valorAlmacenar = pilaTemporal.pop();
  var direccionAlmacenar = parseInt(pilaTemporal.pop());
  if(direccionAlmacenar!==NaN){
    memoriaDatos[direccionAlmacenar] = valorAlmacenar; 
    return respuestaJSON(true,'OP: STO se almaceno '+valorAlmacenar+' en la direccion '+direccionAlmacenar,valorAlmacenar);

  }
}

function instruccionGRT(){
   if(pilaTemporal.length>1){
      var content1 = parseInt(pilaTemporal.pop());
      var content2 = parseInt(pilaTemporal.pop());
      var resultado = content2>content1;
      pilaTemporal.push(resultado);
       return respuestaJSON(true,'OP: GRT se almaceno la comparacion con resultado: '+resultado,resultado);

   }
   else{
      pilaTemporal.push(false);
      return respuestaJSON(false,'OP: GRT hay suficientes elementos en la pila para comparar, se almacena: false',false);
   }

}

function instruccionEQU(){
   if(pilaTemporal.length>1){
      var content1 = parseInt(pilaTemporal.pop());
      var content2 = parseInt(pilaTemporal.pop());
      var resultado = content1==content2;
      pilaTemporal.push(resultado);
       return respuestaJSON(true,'OP: EQU se almaceno la comparacion con resultado: '+resultado,resultado);

   }
   else{
      pilaTemporal.push(false);
      return respuestaJSON(false,'OP: EQU hay suficientes elementos en la pila para comparar, se almacena: false',false);
   }

}

function instruccionSBI(){
   if(pilaTemporal.length>1){
      var content1 = parseInt(pilaTemporal.pop());
      var content2 = parseInt(pilaTemporal.pop());
      var resultado = content2-content1;
      pilaTemporal.push(resultado);
       return respuestaJSON(true,'OP: SBI se ha almacenado la operacion resta resultado: '+resultado,resultado);


   }
   else{
      pilaTemporal.push(false);
      return respuestaJSON(false,'OP: SBI hay suficientes elementos en la pila realizar la operacion',0);
   }

}


function instruccionMPI(){
   if(pilaTemporal.length>1){
      var content1 = parseInt(pilaTemporal.pop());
      var content2 = parseInt(pilaTemporal.pop());
      var resultado = content1*content2;
      pilaTemporal.push(resultado);
       return respuestaJSON(true,'OP: MPI se ha almacenado la operacion multiplicacion resultado: '+resultado,resultado);

   }
   else{
      pilaTemporal.push(false);
      return respuestaJSON(false,'OP: MPI hay suficientes elementos en la pila realizar la operacion',0);
   }

}

function instruccionWRI(){
  if(pilaTemporal>0){
    var resp=pilaTemporal.pop();
    return respuestaJSON(true,"OP: WRI [[ "+resp+" ]]",resp);
  }else{
    return respuestaJSON(false,"OP: WRI No hay elementos para imprimir","");
  }
}


function instruccionRDI(val){
  if(pilaTemporal.length>0){
    var ind = pilaTemporal.pop();
    memoriaDatos[ind] = parseInt(val);
    return respuestaJSON(true, 'OP: RDI se almaceno '+val+' en la direccion de memoria: '+ind,val);
  }
  else{
    //var ind = posActualMemoria;
  //  memoriaDatos[ind] = parseInt(val);
    basurero.push(val);
    return respuestaJSON(false,'OP: RDI no se almaceno el valor leido, no hay direccion cargada en pila',val);
  }
}

function instruccionFJP(){
  var resp = pilaTemporal.pop();
  return respuestaJSON(true,'OP: FJP  salto a la linea ',resp);
}

function instruccionIXA(val){
 if(pilaTemporal.length>0){
    var desplazamiento = parseInt(pilaTemporal.pop());
    var direccion = parseInt(pilaTemporal.pop());
     var factor = parseInt(val);
    var ixa = desplazamiento + (direccion * factor);  
    return respuestaJSON(true,'OP: IXA Se hizo un desplazamiento desde la direccion: '+direccion+' hasta: '+desplazamiento,val);
  }
  else{
     return respuestaJSON(false,'OP:IXA no hubo desplazamiento, debe habaer un elemento al tope de la pila',val);
  }
}

function instruccionIND(val){
   if(pilaTemporal.length>0){
      var direccion = parseInt(pilaTemporal.pop());
      var desplazamiento = parseInt(val);
      var ind = direccion + desplazamiento;
      respuestaJSON(true,'OP: IND Se almacena la direccion ('+ind+')de memoria con desplazamiento: '+val,val);
   }
   else{
  return respuestaJSON(false,'OP:IND no hubo asignacion de memoria con desplazamiento, debe habaer un elemento al tope de la pila',val);
   }
}


function respuestaJSON(rok,rcomentario,rvalor){
return {ok:rok, comentario:rcomentario, valor:rvalor}

}



/*
< >

  */