import '../App.css'
import type { Libro } from '../types/Libro.ts';
import { Link } from 'react-router-dom';

type CardProps={
    libro: Libro;
}

function Card({libro}: CardProps){

    return(
        <>
        <div className='card flex flex-col items-center'>
          <img src={`https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`} alt="portada no disponible"></img>
          <h5>{libro.title}</h5>
          <p>{libro.author_name?.join(",")??"autor no disponible"}</p>
          <Link className='boton' to={`/Libro/${libro.cover_i}/${libro.title}/${libro.author_name?.join(",")}/${libro.key.split("/")[2]}`}>Ver Detalle</Link>
        </div>
        </>
      )
}

export default Card;