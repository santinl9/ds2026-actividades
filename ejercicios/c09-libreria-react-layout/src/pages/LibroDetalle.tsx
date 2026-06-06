import '../App.css';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

function LibroDetalle(){

    const[cargando, setCargando] = useState<boolean>(false);
    const[descripcion, setDescripcion] = useState<string>();

    const {cover_i, title, author_name, key}= useParams<{
        cover_i: string;
        title: string;
        author_name?: string;
        key:string
    }>()

    useEffect(()=>{

        async function libroDescripcion(key:string): Promise<string> {

            try {
                const salida = await fetch(`https://openlibrary.org/works/${key}.json`); 
        
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
        libroDescripcion(key);

    },[])

    return(
        <>
        <div className='cuerpo' id="acerca_de">
            <div className="flex flex-row justify-evenly flex-wrap">
                <img src={`https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`} className='w-[300px]'></img>
                <div className="flex flex-col items-center max-w-[600px]"> 
                    <h1>{title}</h1>
                    <p>{author_name??"autor no disponible"}</p>
                    <p>{cargando?"cargando...": descripcion}</p>
                </div>
            </div>
            <div className='flex flex-row justify-center flex-wrap gap-3'>
                <p>${(Math.random() * 5000).toFixed(2).toString()}</p>
                <button className='w-screen'>Comprar</button>
                <button>Ir al catálogo</button>
            </div>
        </div>
        </>
    )


};

export default LibroDetalle;