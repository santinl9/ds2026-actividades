import { useDelete } from "../hooks/useDelete";
import { useState, useEffect } from "react";

type CardProps={
    id: string;
    titulo: string;
    imagen_url: string;
    descripcion: string | null;
    precio: number;
    autor: {
      id: string;
      nombre: string;
      fecha_nacimiento: string | null;
    } | null;
    categorias: {
        id: string;
        obras_asociadas: number;
    }[];
}

function Card({id, titulo, imagen_url, descripcion, precio, autor, categorias}: CardProps){

    const  { data: data_bd, loading: loading_bd, error: error_bd, remove } = useDelete(`/libros/${id}`)
    const [elimnado, setEliminado] = useState<boolean>(false)

    useEffect( ()=>{
        if (data_bd){setEliminado(true)} 
    }),(data_bd) //necesito algo que se quede mirando data_bd después de que se renderice el componente

    return(
        <>
        {
        (elimnado==false)&&
            <div className="flex flex-col items-center gap-1 w-[210px] p-3 card">
                <img src={imagen_url} alt="portada no disponible" className="w-[180px] h-[270px] object-cover"></img>
                <h5 className="text-center">{titulo}</h5>
                <p className="text-center text-sm">{(autor==null)?"anónimo": autor.nombre}</p>
                <div className="flex flex-wrap text-sm">
                {
                    (categorias!=null)&&
                    categorias.map((cat)=>(
                        <span>{cat.id}, </span>
                    ))
                }
                </div>
                {
                (descripcion!=null)&&<p className="text-center text-xs">{(descripcion.length>100)?descripcion.slice(0,100): descripcion}...</p>
                }
                {
                (!descripcion==null)&&<p className="text-center text-sm">descipción no disponible</p>
                }
                <p>${precio}</p>
                <button className="boton" onClick={()=>remove()}>
                Eliminar
                {
                    (loading_bd)&&        
                    <div className="flex justify-center items-center h-40">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-red-600"></div>
                    </div>
                }
                {
                    (error_bd)&&
                    <div className="rounded-md border border-red-300 bg-red-100 p-4 text-red-700">
                        {error_bd}
                    </div>
                }
                {
                    (data_bd)&&
                    <div className="rounded-md border border-green-300 bg-green-100 p-4 text-green-700">
                    Eliminado con éxto
                    </div>
                }

                </button>
            
            </div>
        
        
        }

        </>
      )
}

export default Card;
