import { useDelete } from "../hooks/useDelete";
import { useState, useEffect } from "react";

type CardProps = {

    id: string;
    nombre: string;
    fecha_nacimiento: string | null;
}

function Card({id, nombre, fecha_nacimiento}: CardProps){

    const  { data: data_bd, loading: loading_bd, error: error_bd, remove } = useDelete(`/autores/${id}`)
    const [elimnado, setEliminado] = useState<boolean>(false)

    useEffect( ()=>{
        if (data_bd){setEliminado(true)} 
    }),(data_bd) //necesito algo que se quede mirando data_bd después de que se renderice el componente

    return(
        <>
        {
        (elimnado==false)&&
            <div className="flex flex-col items-center gap-1 w-[210px] p-3 card">
                <h5 className="text-center">{nombre}</h5>
                <p className="text-center text-sm">{(fecha_nacimiento)??"fecha no disponible"}</p>
                
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
