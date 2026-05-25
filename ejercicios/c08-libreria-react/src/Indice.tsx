import './App.css';
import {useEffect, useState} from 'react';
import type { Libro } from './App.tsx'; //Type no viene de Type={} sino de typescript

type CardProps={
    libro: Libro;
    setLibro: React.Dispatch<React.SetStateAction<Libro>>;
    setPagina: React.Dispatch<React.SetStateAction<number>>;
}

type IndiceProps= {
    setPagina: React.Dispatch<React.SetStateAction<number>>;
    setLibro: React.Dispatch<React.SetStateAction<Libro>>;
}

function Card({libro, setLibro, setPagina}: CardProps){

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

export function Indice({ setLibro, setPagina}: IndiceProps){

    const[libros,setLibros] = useState<Libro[]>([]);
    const[cargando, setCargando] = useState<boolean>(false);

    useEffect(()=>{ //useEffect se ejecuta una vez que se renderiza toda la página, sirve para ejecutar operaciones en segundo plano

        async function librosTendencia_6(): Promise<Libro[]> {

            try {
                const salida = await fetch(`https://openlibrary.org/search.json?q=love&sort=rating+desc&limit=6&fields=title,author_name,cover_i,key`); 
        
                if (!salida.ok){
                    throw new Error(`Error en la solicitud ${salida.status}`);
                }
                
                const salidaJSON = await salida.json();
                
                setLibros( salidaJSON.docs);
                setCargando(false);
            }
            catch (error){
                alert(`Error al obtener los libros tendencia: ${error}`);
        
                setLibros([]);
                setCargando(false);
            }
            return libros;
        }

        setCargando(true);
        librosTendencia_6();
        
    },[]) //se ejecuta solo una vez
  
    return(

        <>
        <div className='cuerpo'>
            <div className='flex flex-col items-center bg-[url(../public/Mejai27s_Soulstealer_old.png)] bg-no-repeat bg-center h-[250px]' id="titulo_indice">
                <h1>Bienvenido!</h1>
                <h2>Librería FeedMejai</h2>
            </div>
            <button className='w-screen' onClick={()=>setPagina(2)}>Visitar Catálogo</button>
            <h1>Libros mejor valorados</h1>
            <div className='flex flex-row flex-wrap justify-center'>
            {
                cargando?
                    <h1>cargando...</h1>:
                    libros.map( (libro)=>( //Uso map porque tsx espera que el código entre llaves devuelva algo, MAP devuelve una nueva colección
                        <Card 
                            libro ={libro}
                            setLibro={setLibro}
                            setPagina={setPagina}
                        />
                    )) 
            }
            </div>
        </div>
        </>
    )

}