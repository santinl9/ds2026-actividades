const boton = document.querySelector('#arboton');

const generarArbol=(altura) =>{

    if (altura==null | altura <= 0 | !Number.isInteger(altura)){
        return false;
    } 
    else {
        let arbol="";
        let ancho = 1;
        for(let i=0; i<altura;i++){
            for(let j=0; j<ancho; j++){
                arbol+="*";
            }
            arbol+="\n";
            ancho+=1;
        }
        return arbol;
    }
}

boton.addEventListener('click',()=>{
    const div = document.querySelector('#div');
    const altura = Number(document.querySelector('#altura').value);
    //const arbol = document.createElement('p');
    //arbol.innerHTML = generarArbol(altura);
    if (generarArbol(altura)){
        document.querySelector('#arbol').innerHTML = generarArbol(altura);
    }
    else{
        alert("altura inválida");
    }
    //div.appendChild(arbol);
});