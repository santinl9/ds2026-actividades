import '../App.css';
import type { libroCargable } from "../types/LibroCargable";
import { useNavigate } from "react-router-dom";
import { libroCargableSchema, type LibroValidado } from '../types/schemas/LibroCargableSchema';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


type NuevoLibroFormProps={
    cargarLibro: (libro: libroCargable)=> void;
}

function NuevoLibroForm( {cargarLibro}: NuevoLibroFormProps){

    const navigate= useNavigate();

    const onSubmit = (data :LibroValidado) =>{
        cargarLibro(data);
        navigate('/Catalogo-Propio');
    }

    const {register, handleSubmit, formState :{errors} }= useForm<LibroValidado>({resolver: zodResolver(libroCargableSchema)});
    
    return(
        <>
        <div className='flex justify-center h-screen'>
            <div id="carga_libro" className='flex flex-col w-[500px] items-center gap-10'>
                <div className='flex flex-col items-center bg-[url(../public/Mejai27s_Soulstealer_old.png)] bg-no-repeat bg-center h-[250px]' id="titulo_indice">
                    <h2>Formulario de Carga</h2>
                    <h3>Nuevo Libro</h3>
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} > 
                    {/*Los nombres son Importantes para que handleChange los detecte*/}
                    {/*<input name="titulo" type="text" value={form.titulo} onChange={handleChange}> {errores.titulo && <p>{errores.titulo}</p>}</input> MAL*/}
                    <div className='flex gap-2'>
                        <h2>Titulo</h2>
                        <input {...register('titulo')} type="text"/> {errors.titulo && <p className='errores'>{errors.titulo.message}</p>} {/*si hay error pone un parrafo sino no hace nada (no queda undefined)*/}
                    </div>
                    <div className='flex gap-2'>
                        <h2>Autor</h2>
                        <input {...register('autor')} type="text" placeholder='anónimo por defecto'/> {errors.autor && <p className='errores'>{errors.autor.message}</p>}
                    </div>
                    <div className='flex gap-2'>
                        <h2>Precio($)</h2>
                        <input {...register('precio', { valueAsNumber: true })} type="text"/>{errors.precio && <p className='errores'>{errors.precio.message}</p>}
                    </div>
                    <button type="submit">Cargar</button> {/*type=submit para que me funcione el onSubmit*/}
                </form>
            </div>
        </div>        
        </>
    )
}

export default NuevoLibroForm