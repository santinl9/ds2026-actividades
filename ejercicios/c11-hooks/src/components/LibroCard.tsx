import '../App.css'
import { Link } from 'react-router-dom';

type CardProps={
    cover_i: number;
    title: string;
    author_name?: string[];
    libro_key: string;
}

function Card({cover_i, title, author_name, libro_key}: CardProps){

    return(
        <>
        <div className='card flex flex-col items-center'>
          <img src={`https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`} alt="portada no disponible"></img>
          <h5>{title}</h5>
          <p>{author_name?.join(",")??"autor no disponible"}</p>
          <Link className='boton' to={`/Libro/${cover_i}/${title}/${author_name?.join(",")}/${libro_key.split("/")[2]}`}>Ver Detalle</Link>
        </div>
        </>
      )
}

export default Card;