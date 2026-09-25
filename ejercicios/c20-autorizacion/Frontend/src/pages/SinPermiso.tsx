import { Link } from "react-router-dom";
import gif from "../../public/nu-uh.gif";

function SinPermiso(){
    const precio = ((Math.random() * 200000) + 300000).toFixed(2);
    return(
        <>
            <div className="fondo flex items-center justify-center h-screen">
                <div className="flex flex-col items-center">
                    <h1>No tenés permiso para acceder a esta página</h1>
                    <img width="200"src={gif}/>
                    <Link className="boton" to="/">Volver al inicio</Link>
                    <br/>
                    <h2>¿Querés rol?</h2>
                    <button className="boton">${precio}</button>
                </div>
            </div>
        </>
    )
}

export default SinPermiso