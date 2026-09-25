import { Link } from "react-router-dom";
import gif from "../../public/money.gif";
import { useState } from "react";

function SoloAdmin(){
    const [contador, setContador]= useState<number>(0);
    const [precio, setPrecio]=useState<number>(Number(((Math.random() * 200000) + 300000).toFixed(2)))

    return(
        <>
            <div className="fondo flex items-center justify-center h-screen">
                <div className="flex flex-col items-center">
                    <h1>Zona del Admin</h1>
                    <img width="200"src={gif}/>
                    <Link className="boton" to="/">Volver al inicio</Link>
                    <br/>
                    <h2>Generador de dinero</h2>
                    <button className="boton" onClick={()=>{
                        setContador(contador + precio);
                        setPrecio(Number(((Math.random() * 200000) + 300000).toFixed(2))) 
                    }}>${precio}</button>
                    <p>${contador.toFixed(2)} generados</p>
                </div>
            </div>
        </>
    )
}

export default SoloAdmin