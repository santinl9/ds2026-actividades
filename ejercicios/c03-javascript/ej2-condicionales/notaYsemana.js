import numeroRandom from "../numeroRandom.js";

const clasificarNota =(nota) => {
    if (nota < 3){
        return "Desaprobado"
    }
    else if(nota >3 && nota < 7){
        return "Aprobado"
    }
    else{
        return "Promocionado"
    }
};

const diaDeLaSemana = (numero) => {
    let dia;
    switch(numero){
        case 1: dia= "Lunes"; break;
        case 2: dia= "Martes"; break;
        case 3: dia= "Miércoles"; break;
        case 4: dia= "Jueves"; break;
        case 5: dia= "Viernes"; break;
        case 6: dia= "Sábado"; break;
        case 7: dia= "Domingo"; break;
        default: return "Dia inválido";
    }
    if (numero == 6 | numero == 7){
        dia += "(fin de semana)";
    }
    return dia;
}

let numero= numeroRandom(1,10);
//let numeroRandom =Math.floor(Math.random() * 10) + 1;
console.log(`el alumno se sacó un ${numero}, está ${clasificarNota(numero)}`);
console.log(`el día de la semana número ${numero} es ${diaDeLaSemana(numero)}`);
console.log("f5 para generar otro número random");

