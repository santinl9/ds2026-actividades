import Tendencias from '../components/Tendencias';
import { Link } from 'react-router-dom';

function Indice(){
  
    return(

        <>
        <div className="fondo">
            <div className='h-screen'>
            <div className="titulo">
                <h1>Bienvenido!</h1>
                <h2>Librería FeedMejai</h2>
            </div>
                <Link to="/Catalogo" className="boton w-screen flex justify-center items-center">Visitar Catálogo</Link>
                <h1>Libros mejor valorados</h1>
                <Tendencias/>
                
            </div>
        </div>
        </>
    )

}

export default Indice
