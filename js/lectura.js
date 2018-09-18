 var lineas = [];
 
function obtenerLineas(){
 //pilaMemoria.push(7);
 //pilaDatos.push('a');
//memoriaCodigo[1] = 'y';
//memoriaDatos[1] = 7;

//memoriaDatos[2] = 5;
//memoriaCodigo[2] = 'x';

console.log(memoriaCodigo);
console.log(memoriaDatos);
/*
lineas.push({linea: 1, instruccion: 'LDC', valor:8});
lineas.push({linea: 2, instruccion: 'LOD', valor:'a'});
lineas.push({linea: 3, instruccion: 'ADI',valor:null});
lineas.push({linea: 4, instruccion: 'LDC', valor:4});
lineas.push({linea: 5, instruccion: 'ADI',valor:null});
*/
return lineas;


}

function leerLinea(){
		var item = {};

  /**
  codigo lectura;
  **/

  document.getElementById('file_reader').onchange = function(){
    var codigo="";

  var file = this.files[0];

  var reader = new FileReader();
  reader.onload = function(progressEvent){
    // Entire file
   // console.log(this.result);

    // By lines
    var lines = this.result.split('\n');
    for(var line = 0; line < lines.length; line++){
      //console.log(lines[line]);
      var inst = lines[line].match(/\S+/g);
      if(inst!==null && inst.length >0){
      inst[0]=inst[0].toUpperCase();
      var imprLinea = inst[0]+' '+(inst[1]?inst[1]:"");
      if(existeComando(inst[0]))
      lineas.push({linea: line, instruccion: inst[0], valor:inst.length>1?inst[1]:null});
        else
          imprLinea=imprLinea+" [No aceptado]";

         console.log(imprLinea);
         codigo+=imprLinea;
         codigo+='</br>';

      }
       
    }
    document.getElementById('codigo').innerHTML=codigo;
  };
  reader.readAsText(file);
 document.getElementById('ejecutar').style.display='block';
 document.getElementById('debug').style.display ='block';
};

}

function existeComando(val){
 
  if(comandos.indexOf(val)!=-1)
      return true;
  else
    return false;  
}