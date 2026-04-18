import numeroRandom from "../numeroRandom.js";

const asteriscosRandom = (n) => {

    let asteriscos ="";
    for (let i=0 ; i<n ;i++){
        asteriscos+="*";
    }
    return asteriscos
}

console.log(asteriscosRandom(numeroRandom(0,10)));