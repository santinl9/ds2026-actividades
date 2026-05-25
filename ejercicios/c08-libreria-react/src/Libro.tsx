import './App.css';
import {useState, useEffect} from 'react';
import type { Libro } from './App.tsx';

type LibroProps={
    libro: Libro;
    setPagina: React.Dispatch<React.SetStateAction<number>>;
}

export function Librotsx({libro, setPagina}: LibroProps){

    const[descripcion, setDescripcion] = useState<string>();
    const[cargando, setCargando] = useState<boolean>(false);

    useEffect(()=>{

        async function libroDescripcion(key:string): Promise<string> {

            try {
                const salida = await fetch(`https://openlibrary.org${key}.json`); 
        
                if (!salida.ok){
                    throw new Error(`Error en la solicitud ${salida.status}`);
                }
        
                const salidaJSON = await salida.json();
        
                setDescripcion( (typeof salidaJSON.description === "string")?salidaJSON.description : salidaJSON.description.value );
                setCargando(false);
               
        
            }
        
            catch (error){
        
                setDescripcion("descripción no disponible");
                setCargando(false);
            }
            return descripcion
        }

        setCargando(true);
        libroDescripcion(libro.key);

    },[])

    return(
        <>
        <div className='cuerpo' id="acerca_de">
            <div className="flex flex-row justify-evenly flex-wrap">
                <img src={`https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`} className='w-[300px]'></img>
                <div className="flex flex-col items-center max-w-[600px]"> 
                    <h1>{libro.title}</h1>
                    <p>{libro.author_name?.join(",")??"autor no disponible"}</p>
                    <p>{cargando?"cargando...": descripcion}</p>
                </div>
            </div>
            <div className='flex flex-row justify-center flex-wrap gap-3'>
                <p>${(Math.random() * 5000).toFixed(2).toString()}</p>
                <button className='w-screen'>Comprar</button>
                <button onClick={()=>setPagina(2)}>Ir al catálogo</button>
            </div>
        </div>
        </>
    )


}