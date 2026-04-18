import numeroRandom from "../numeroRandom.js";

const calcularPrecioFinal = (monto,medioPago) =>{

    let montoFinal;

    if (200 < monto && monto < 400){
        switch(medioPago){
            case 'E': montoFinal = monto * 0.7; break;
            case 'D': montoFinal = monto * 0.8; break;
            case 'C': montoFinal = monto * 0.9; break;
            default: montoFinal = monto; break;
        }
    }
    else if (monto > 400){
        montoFinal = monto * 0.6;
    }
    else{
        montoFinal = monto;
    } 

    return Math.floor(montoFinal); //la multiplicación con decimales trae error de punto flotante, me lo saco de encima así
}


const letraRandom = ['E','D','C'][numeroRandom(0,3)];
const montoRandom = numeroRandom(100,500);
const final= calcularPrecioFinal(montoRandom , letraRandom);

console.log(`Monto: ${montoRandom} | Pago: ${letraRandom} | Final: ${final}`);
console.log("f5 para generar otro monto y medio de pago random");