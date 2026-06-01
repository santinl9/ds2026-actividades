import type { Libro } from '../types/Libro.ts';

type CardProps={
    libro: Libro;
    setLibro: React.Dispatch<React.SetStateAction<Libro>>;
    setPagina: React.Dispatch<React.SetStateAction<number>>;
}

export function Card({libro, setLibro, setPagina}: CardProps){

    return(
        <>
        <div className='card flex flex-col items-center'>
          <img src={`https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`} alt="portada no disponible"></img>
          <h5>{libro.title}</h5>
          <p>{libro.author_name?.join(",")??"autor no disponible"}</p>
          <button onClick={ ()=>(setPagina(4), setLibro(libro))}>Ver más</button>
        </div>
        </>
      )
}