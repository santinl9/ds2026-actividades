import type { libroCargable } from "../types/LibroCargable"
import CargableCard from '../components/LibroCargableCard'
import { Link } from 'react-router-dom';
import portadaBase from '../../public/Captura de pantalla 2026-06-08 095254.png'

type CatalogoPropioProps={
    libros: libroCargable[]
}

function CatalogoPropio({libros}: CatalogoPropioProps){
    return(
        <>
        <div className="h-screen">
            <Link className='boton w-full flex justify-center items-center' to="/Catalogo-Propio/Nuevo-Libro">Cargar Libro</Link>
            <div className="flex flex-row gap-5">
                {
                libros.map( (libro)=>( //Uso map porque tsx espera que el código entre llaves devuelva algo, MAP devuelve una nueva colección
                    <CargableCard
                        portada={portadaBase}
                        titulo={libro.titulo}
                        autor={libro.autor}
                        precio={libro.precio}
                    />
                )) 
                }
            </div>
        </div>
        </>
    )
}

export default CatalogoPropio