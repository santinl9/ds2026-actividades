import '../App.css';
import { useParams, Link } from 'react-router-dom';
import Descripcion from '../components/Descripcion';


function LibroDetalle(){

    const { cover_i, title, author_name, libro_key}= useParams<{
        cover_i: string;
        title: string;
        author_name?: string;
        libro_key:string
    }>()

    return(
        <>
        <div className='cuerpo h-screen'>
            <div id="acerca_de" className="flex flex-row justify-evenly flex-wrap">
                <img src={`https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`} className='w-[300px]'></img>
                <div className="flex flex-col items-center max-w-[600px]"> 
                    <h1>{title}</h1>
                    <p>{author_name??"autor no disponible"}</p>
                    <Descripcion libro_key={libro_key}/>
                </div>
            </div>
            <div className='flex flex-row justify-center flex-wrap gap-3'>
                <p>${(Math.random() * 5000).toFixed(2).toString()}</p>
                <button className='w-screen'>Comprar</button>
                <Link to="" className='boton'>Ir al catálogo</Link>
            </div>
        </div>
        </>
    )


};

export default LibroDetalle;