import numeroRandom from "../numeroRandom.js";

const arregloRandom = () => {

    let arreglo= new Array(numeroRandom(8,20));
    for (let i = 0; i < arreglo.length; i++){
        arreglo[i]= numeroRandom(0,100) ;
    }
    return arreglo;
}

const sumaTotal= (arreglo) => {
    let suma=0;
    for (let e of arreglo){
        suma+=e;
    }
    return suma;
}

const promedio= (arreglo) => {
    return Math.floor(sumaTotal(arreglo)/arreglo.length);
}

const numMayor= (arreglo) => {
    return Math.max(...arreglo);
}

const numMenor= (arreglo) => {
    return Math.min(...arreglo);
}

const mostrarArreglo=(arreglo) => {
    return arreglo.join(',');
}

const arreglo = arregloRandom();

console.log(`Arreglo: ${mostrarArreglo(arreglo)}\n\tSuma total: ${sumaTotal(arreglo)}\n\tPromedio: ${promedio(arreglo)}\n\tNúmero mayor: ${numMayor(arreglo)}\n\tNúmero menor: ${numMenor(arreglo)}`);



