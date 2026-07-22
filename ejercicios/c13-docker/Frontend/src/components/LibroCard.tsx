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
        <div className="flex flex-col items-center gap-1 w-[210px] p-3 card">
          <img src={`https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`} alt="portada no disponible" className="w-[180px] h-[270px] object-cover"></img>
          <h5 className="text-center">{title}</h5>
          <p className="text-center text-sm">{author_name?.join(",")??"autor no disponible"}</p>
          <Link className="boton" to={`/Libro/${cover_i}/${encodeURIComponent(title)}/${encodeURIComponent(author_name?.join(","))}/${libro_key.split("/")[2]}`}>Ver Detalle</Link>
        </div>
        </>
      )
}

export default Card;
