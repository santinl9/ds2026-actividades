const boton = document.querySelector('#arboton') as HTMLElement;

const alturaValida =(altura :number ): boolean =>{

    if (altura < 0){
        return false
    }
    else{ 
        return true
    }

}
const generarArbol=(altura : number): string =>{

    let arbol: string="";
    let ancho: number = 1;

    for(let i=0; i<altura;i++){
        for(let j=0; j<ancho; j++){
            arbol+="*";
        }
        arbol+="\n";
        ancho+=1;
    }
    return arbol;

}

boton.addEventListener('click',()=>{
    const div = document.querySelector('#div') as HTMLElement;
    const altura = Number(document.querySelector('#altura').value);
    //const arbol = document.createElement('p');
    //arbol.innerHTML = generarArbol(altura);
    if (alturaValida(altura)){
        document.querySelector('#arbol').innerHTML = generarArbol(altura);
    }
    else{
        alert("altura inválida");
    }
    //div.appendChild(arbol);
});